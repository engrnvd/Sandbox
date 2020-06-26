echo "Script executed from: ${PWD}"

dirPath=$(dirname $0)
echo "Current dir path: " $dirPath

dirName=$(basename $dirPath)
echo "Current dir name: " $dirName

scriptName=$(basename -- "$0")
echo "Current script name: " $scriptName

read -p "Press any key to continue" key
