import os from "os"
console.log(os.hostname())
console.log(os.platform())
console.log(os.homedir())
console.log(os.userInfo())

// Basic OS Information
console.log(os.hostname()); // Returns the hostname of the operating system.
console.log(os.platform()); // Returns the platform of the operating system (e.g., 'win32', 'linux').
console.log(os.arch()); // Returns the architecture of the CPU (e.g., 'x64', 'arm').
console.log(os.type()); // Returns the OS name (e.g., 'Linux', 'Windows_NT').
console.log(os.release()); // Returns the OS release version.
console.log(os.version()); // Returns the OS version.

// System Uptime and Load
console.log(os.uptime()); // Returns the system uptime in seconds.
console.log(os.loadavg()); // Returns an array with the load averages (1, 5, and 15 minutes, only on Unix systems).

// CPU and Memory Information
console.log(os.cpus()); // Returns an array of objects containing information about each CPU/core.
console.log(os.totalmem()/(1024*1024*1024)),"GB"; // Returns the total system memory in bytes.
console.log(os.freemem()/(1024*1024*1024)),"GB"; // Returns the available system memory in bytes.

// Network and User Information
console.log(os.networkInterfaces()); // Returns an object of network interfaces.
console.log(os.userInfo()); // Returns information about the current user.

// System Constants
console.log(os.constants); // Returns operating system-specific constants.

// Directory Paths
console.log(os.homedir()); // Returns the home directory of the current user.
console.log(os.tmpdir()); // Returns the default directory for temporary files.

// Endianness
console.log(os.endianness()); // Returns the byte order of the CPU ('BE' for Big Endian, 'LE' for Little Endian).

// Signals
console.log(os.constants.signals); // Returns signals like SIGINT, SIGHUP, etc., supported by the OS.

// Priority Management
console.log(os.getPriority()); // Returns the scheduling priority of the current process.
console.log(os.getPriority(0)); // Can also get priority for a specific process ID.
os.setPriority(0, 10); // Sets the scheduling priority for a process (requires proper permissions).

// Miscellaneous
console.log(os.EOL); // Returns the end-of-line marker for the OS ('\n' for Linux/Mac, '\r\n' for Windows).
console.log(os.tmpdir()); // Returns the system's default directory for temporary files.

