import subprocess
import sys
import os

def run_command(command, cwd=None):
    """Run a shell command and print output."""
    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            check=True,
            shell=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(e.stderr)
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 execution/git_sync.py \"commit message\"")
        sys.exit(1)

    commit_message = sys.argv[1]
    
    # Get project root (assuming script is in execution/ subdir)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    print(f"Syncing changes in {project_root}...")

    # Stage all changes
    run_command("git add .", cwd=project_root)

    # Commit
    # Check if there are changes to commit first to avoid error
    try:
        subprocess.run("git diff --cached --quiet", cwd=project_root, check=True, shell=True)
        print("No changes to commit.")
    except subprocess.CalledProcessError:
        # Changes exist, proceed to commit
        run_command(f"git commit -m \"{commit_message}\"", cwd=project_root)
        
        # Push
        # Note: This checks if an upstream is set, if not it might fail or need -u origin main
        # For now, we'll assume a standard push works, or the user can configure it.
        try:
             run_command("git push", cwd=project_root)
             print("Successfully synced.")
        except:
            print("Push failed. You might need to set upstream branch manually.")
            sys.exit(1)

if __name__ == "__main__":
    main()
