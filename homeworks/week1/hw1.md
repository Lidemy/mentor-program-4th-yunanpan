## 交作業流程

- #### 本地端作業
  1. 寫作業前先開分支： `git branch week-one`
  2. 切換到新開的分支下： `git checkout week-one`
  （第 1、2 點可簡化成 `git checkout -b week-one`）
  3. 寫作業到一個段落後，如果無新增檔案可直接跳第 6 點，若有則接續第 4 點
  4. 讓新增的檔案加入版本控制：`git add .`
  5. commit 到 local repository：`git commit -m "week-one hw"`，跳第 7 點
  6. 因為只是修改檔案，原檔案已經加入版本控制，所以直接 commit 到 local repository：`git commit -am "week-one hw"`
  7. 檢查過作業，並且確認過當週自我檢討就可以將作業推送到 GitHub 了 

- #### 推送到 GitHub   
  8. 將作業的新分支推送到 GitHub：`git push origin week-one`
  9. 推送完成在 GitHub 會看到 `compare & pull request`，想要把推送上去的分支併到 GitHub repository 的 master
  10. 如果沒有自動出現第 8 點，就自己按 `new pull request`，並選擇自己要併入 GitHub repository master 裡的分支
  11.  確認該交的作業都有 push 上去，就可以按下 `create pull request` 交作業

- #### 學習系統  
  12.  在 GitHub 交好作業，就去學習系統 > 作業列表 > 新增作業 > 第幾週
  13.  貼上 PR 連結繳交作業

- #### 助教改過後
  14.  確認 GitHub 上繳交的檔案已經被改過且被 merge 了
  15.  本地端切回 master：`git checkout master`
  16.  把 GitHub 上的 master 同步下來：git pull origin master
  17.  刪掉本地端為了寫作業新增的分支，讓分支的狀態也和 GitHub 上相同：`git branch -d week-one`