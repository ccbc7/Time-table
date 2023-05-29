provider "aws" {
region = "ap-northeast-1"
}

variable "region" {
  description = "The region where the infrastructure will be created"
  default     = "ap-northeast-1"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "myuser"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# variable "copilot_security_group_id" {
#   default = "sg-0b880556cd735fe91"
# }

# resource "aws_security_group_rule" "allow_copilot_access" {
#   type              = "ingress"
#   from_port         = 3306
#   to_port           = 3306
#   protocol          = "tcp"
#   source_security_group_id = var.copilot_security_group_id

#   security_group_id = aws_security_group.time_table02_rds_sg.id
# }
