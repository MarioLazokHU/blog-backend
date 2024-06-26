# How to start
Must install the edgedb cli and server:

Linux/macOS: `curl https://sh.edgedb.com --proto '=https' -sSf1 | sh`
Windos PS*: `iwr https://ps1.edgedb.com -useb | iex`

# Init DB
edgedb project init (in project lib)
 - Just hit all enter or Y if need.

# Migration & Start
bash: `sh ./start_server_dev.sh`

# Note* 
EdgeDB on Windows requires WSL 2 to create local instances because the EdgeDB server runs on Linux. It is not required if you will use the CLI only to manage EdgeDB Cloud and/or other remote instances. This quickstart does create local instances, so WSL 2 is required to complete the quickstart.

# Frontend:
https://github.com/MarioLazokHU/dn_interview.git
