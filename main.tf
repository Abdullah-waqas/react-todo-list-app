terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_default_vpc" "vpc-031fa7c6a5cadfb40" {
  tags = {
    Name = "Default VPC"
  }
  
}


