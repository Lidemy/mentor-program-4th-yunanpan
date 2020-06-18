# !/bin/bash

s=0
i=0
# read -p "請輸入正整數 " n
while [ "${i}" != "$1" ]
do
	i=$(($i+1))
	touch $i.js
done
echo "檔案建立完成"
