provider "aws" {
  access_key = ""
  secret_key = ""
  region     = "eu-central-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0718a1ae90971ce4d"
  instance_type = "t2.micro"
}

