#!/usr/bin/env bash

REGISTRY="registry.gitlab.com"

usage() {
  echo "Usage: ./$(basename "$0")"
  echo "$(basename -s .sh "$0") allows you to pull docker images from our container registry."
  echo -e "\\n  -h    display this help and exit"

  exit 1
}

die() {
  echo "$1" >&2
  exit 1
}

pull_images() {
  local images=("dev-angular" "dev-django" "dev-sonarscanner")

  for image in "${images[@]}"; do
    docker pull "${REGISTRY}/baptiste72/sigl/${image}"
    docker tag "${REGISTRY}/baptiste72/sigl/${image}" "${image}"
    docker rmi "${REGISTRY}/baptiste72/sigl/${image}"
  done
}

main() {
  if [[ "${OSTYPE}" == "msys" ]]; then
    winpty docker login "${REGISTRY}"
  else
    docker login "${REGISTRY}"
  fi

  pull_images
  docker logout "${REGISTRY}"
}

while getopts ':h' opt; do
  case "${opt}" in
    h) usage ;;
    *) ;;
  esac
done

# Check number of arguments
[[ "$#" -eq 0 ]] || die "[FAIL] You must invoke the script without any argument : $# provided !"

main
