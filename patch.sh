#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/run/media/vexis/01DD5BE64A938350/cyberdojo"
cd "$PROJECT_DIR"

GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
log() { echo -e "${CYAN}▶${NC} $*"; }
ok()  { echo -e "${GREEN}✔${NC} $*"; }

# ---------- 1. Init git if needed ----------
if [ ! -d ".git" ]; then
  log "Initializing git repository..."
  git init --initial-branch=main
  git add .
  git commit -m "Initial commit"
  ok "Git initialized"
else
  warn "Git already initialized"
fi

# ---------- 2. Create the workflow file ----------
log "Creating GitHub Actions workflow..."
mkdir -p .github/workflows

cat > .github/workflows/build-windows.yml <<'YAML'
name: Build Windows EXE

on:
  push:
    branches: [main]
  workflow_dispatch:  # allows manual trigger from Actions tab

jobs:
  build-windows:
    runs-on: windows-latest
    timeout-minutes: 45

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust
        uses: dtolnay/rust-toolchain@stable

      - name: Install frontend dependencies
        run: npm install

      - name: Build Tauri app for Windows
        run: npm run tauri build

      - name: Upload EXE installer
        uses: actions/upload-artifact@v4
        with:
          name: cyberdojo-windows-setup
          path: src-tauri/target/release/bundle/nsis/*.exe
          if-no-files-found: error
          retention-days: 7
YAML

git add .github/workflows/build-windows.yml
git commit -m "Add Windows build workflow"
ok "Workflow file created"

# ---------- 3. Create GitHub repo and push ----------
log "Creating GitHub repository with gh..."
# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ You need to authenticate first. Run: gh auth login"
  exit 1
fi

# Create repo (public — change to --private if you want)
# The --source=. flag pushes the current directory
gh repo create cyberdojo --public --source=. --push 2>&1 || {
  # If repo already exists, just push
  log "Repo might already exist, pushing..."
  git remote add origin "https://github.com/$(gh api user -q .login)/cyberdojo.git" 2>/dev/null || true
  git push -u origin main
}

ok "Code pushed to GitHub!"
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅  Done!                                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
echo "1. Go to https://github.com/$(gh api user -q .login)/cyberdojo/actions"
echo "2. Wait for the workflow to finish (about 5-10 minutes)"
echo "3. Click on the run, scroll down to 'Artifacts'"
echo "4. Download 'cyberdojo-windows-setup.zip'"
echo "5. Extract the .exe and run it on Windows"
echo ""
echo "Or use this command to download via gh:"
echo "  gh run download -n cyberdojo-windows-setup"
