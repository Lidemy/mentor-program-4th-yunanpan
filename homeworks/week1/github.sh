touch temp.txt
touch final.txt
curl -s -o "$1.txt" "https://api.github.com/users/$1"
grep -E '"name"|"bio"|"location"|"blog"' $1.txt > temp.txt

cut -d : -f 2 temp.txt | awk 'NR==1' > final.txt
cut -d : -f 2 temp.txt | awk 'NR==4' >> final.txt
cut -d : -f 2 temp.txt | awk 'NR==3' >> final.txt
cut -d : -f 2-3 temp.txt | awk 'NR==2' >> final.txt

sed -e 's/"//g' -e 's/,$//' -e 's/null//g' final.txt


