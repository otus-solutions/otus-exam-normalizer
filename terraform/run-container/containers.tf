variable "otus-exam-port"{
  default = 51004
}

variable "otus-exam-version" {
   default = "otus-exam-normalizer:latest"
}

resource "docker_container" "otus-exam-normalizer" {
  name = "otus-exam-normalizer"
  image = "${var.otus-exam-version}"
  ports {
	internal = 80
	external = "${var.otus-exam-port}"
  }
}
