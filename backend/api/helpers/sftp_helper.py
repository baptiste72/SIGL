import os
import paramiko

class SftpHelper:
    def sftp_open_connection():
        key_filename = os.path.relpath(".ssh/id_ed25519_sftp")
        private_key = paramiko.Ed25519Key.from_private_key_file(key_filename)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname='projet-sigl.fr', username='sftp', pkey=private_key, port=2222)
        sftp = ssh.open_sftp()
        return sftp, ssh
    
    def sftp_close_connection(sftp, ssh):
        sftp.close()
        ssh.close()