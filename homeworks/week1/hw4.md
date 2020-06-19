## 跟你朋友介紹 Git

### Git 的基本概念

Git 是協助版本控制的程式。這時候可能會有疑問說版本控制不就好好整理跟命名資料夾就好了嗎？為什麼需要用 Git 來幫助我們做版本控制呢？  
那是因為一般當檔案內容有更動時，就會存一次歷史檔案，當檔案越存越多時，就會開始不知道 200604 存的檔案是改了什麼，或是不知道 200606 的檔案又是為何而存。另外當多人協作時，或許會不小心互相改到對方的檔案，此時既不知道自己某一版改了什麼，又要去比對協作者改了什麼。整個存檔系統就會亂掉，且沒有脈絡。  
而利用 Git 來做版本控制，便可防止檔案管理者玩大家來找碴，一一比對不同處，或是猜測過去的版本到底是改了什麼。

Git 在各個階段將檔案加入版本控制並提交到數據庫中時，也會記錄各版本修改的部分以利後續查詢。也可以透過創建不同分支處理不同功能，合併的時候若有衝突也會跳出不同處以利比對修改。

---

### 如何安裝 Git？

**Windows：**
在 [Git 官網](https://git-scm.com/)上下載即可。安裝完開啟 git-bash 輸入 git --version，確認是否安裝成功並確認版本。  
**Mac：**
在 terminal 中一樣輸入 git --version，就會連去安裝。

---

### Git 基本指令

`git init`：在需要使用 Git 做版本控制的資料夾下使用。初始化後，Git 就知道要對指定資料夾做版本控制。在指定資料夾下會自動新增 .git 的資料夾。  
`git status`：查看資料夾內檔案狀態。  
`git add`：決定是否加入版本控制。
- untracked：未加入
- staged：加入

`git add .`：將資料夾內所有檔案都加入版本控制。  
`git add <filename>`：將指定檔案加入版本控制。  
`git rm --cached <filename>`：從 staged 移回 untracked（不做版本控制）。  
`git commit -m "msg"`：新建一個版本， msg 可以寫入此版修改了什麼地方。  
`git commit -am "msg"`：`git add .` + `git commit -m "msg"`。只能用於已經加入 staging area 後修改過的檔案，新建且還沒加入版本控制的檔案還是需要先使用 git add 加入版本控制。  
`git log`：查詢歷史紀錄。  
`git log --oneline`：顯示較短版本的歷史紀錄。  
`git checkout <branch>|<版本號>`：切換到某條分支或是切換到某個版本。  
`git checkout master`：切換回最新狀態。  
`git diff`：在 commit 前可以看檔案改了什麼內容。  

---

### 永不加入版本控制的檔案處理方式

有些檔案一直都不會加入版本控制，那每次 `git add` 的時候，就不能用 `git add .`，因為會涵蓋到不打算加入版本控制的檔案（假設此檔案是text.txt）。但要一個一個輸入 `git add` 又太花時間。此時可以建立 .gitignore 的檔案，將 text.txt 名稱寫進去，如此一來便可直接使用 `git add .`，也不怕涵蓋到 text.txt。步驟如下：

1. `touch .gitignore`：建立 .gitignore 檔案。
2. `vim .gitignore`：進入 .gitignore 編輯，寫入 text.txt。
3. 按 :wq 跳出 vim 後輸入 `git status` 查看狀態，會發現 text.txt 已經不在 untracked 的狀態上了。

---

### Git branch

**為什麼需要 branch？**  
在開發網站的新功能時，有時會需要中途去修一下 bug。如果用一條線的方式開發網站，就會出現「卡在一半的新功能和修好 bug」的不完整網頁。而開啟不同分支去處理不同功能，便可以避免此種狀況。在各自的 branch 完成功能後再 merge 回主要檔案才是完整的檔案。分支的方法也可應用在團隊分工上。

如果菜哥的笑話會從一個發想開始發散的話也可以使用 branch。每個笑話的主人公都是猴子，可是猴子星期一到星期天做的事情都不一樣，就可以從猴子為主幹，開星期一到星期天的 branch 去延伸每天的笑話，最後再 merge 回來湊成猴子一星期的笑話。

### Git branch 相關指令
`git branch -v`： 查看目前有哪些分支，並且可以看現在位在哪條分支上。  
`git branch <branch-name>`：新開分支。  
`git branch -d <branch-name>`：刪除分支。  
`git checkout <branch-name>`：切換分支。  
`git merge <branch-name>`：把分支合併進目前所在的分支。

### 如果 merge 遇到衝突怎麼辦？  
Git 很聰明，不會讓你玩大家來找碴，在發生衝突時就會跳出警告，並告訴你該怎麼做：`fix conflicts and then commit the result.`

```
<<<<< HEAD
<被併入的分支檔案內容衝突部分>
|||||| <版本號>
<被併入與併入的共同祖先檔案內容衝突部分>
========
<併入的分支檔案內容衝突部分>
>>>>>> branch
```

比對後手動修成正確的版本存檔後，再 commit 就可解決衝突了。

---

### GitHub

在多人協作的時候，需要共享同一份 repository。就像是我們會用 google 雲端共同編輯檔案的概念。那這份共享的 repository 要放在哪裡呢？當然可以選擇自己架設 git repository 的 server，而廣泛被使用的則是 GitHub。也有其他服務像是：Bitbucket、GitLab。

### 如何把 code 放上 GitHub

1. 在 GitHub 介面的右上角可以點選 new repository，在 GitHub 上建立新的數據庫。  
2. 建立好後，GitHub 會有說明告訴你下一步怎麼做。  
3. `git remote add origin <GitHub提供的網址>`：在 GitHub 提供網址的位置架一個代號為 origin 的遠端數據庫。  
4. `git push -u origin master`：在本地端資料推送到 GitHub 的 origin 數據庫 master 分支上。  

### 將本地最新的改變推上 GitHub

`git push origin master`  
`git push origin <branch-name>`：上傳分支

### 將 GitHub 最新版 pull 下來

`git pull origin master`

---
