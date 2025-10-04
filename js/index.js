const cover = document.querySelector('.cover')

//記錄我的最愛項目index
const likeList = new Set([])
let isLikeMode = false


//顯示切換我的最愛按鈕
const showLikeBtn = document.querySelector('.onlyLike')
const varText = showLikeBtn.querySelector('.varText')

//處理秀我的最愛的ul
const likeListUl = document.querySelector('.like-list')
const upDateListList = () => {
    let ulHTML = ''
    likeList.forEach((id) => {
        const inner = document.querySelectorAll('.card')[id].querySelector('h3 .name').innerText
        ulHTML = ulHTML + `<li><a href="#card${id + 1}"><span class="head"></span>${inner}</a></li>`
    })
    likeListUl.innerHTML = ulHTML
}


//更新我的最愛數量
const numSpan = showLikeBtn.querySelector('.num')
const updateLikesNum = () => {
    let likesNum = likeList.size || 0
    numSpan.innerText = likesNum
}
updateLikesNum()




//複製網址函式
const copyLink = (text) => {
    const textarea = document.createElement("textarea")
    textarea.value = text

    document.body.appendChild(textarea)
    textarea.select() //選取文字
    document.execCommand("copy") //複製
    document.body.removeChild(textarea)
}

// 設定預覽圖片的控制
let isLoopUp = false
const loopUpBtns = document.querySelectorAll('.img-box .lookup')




//滑鼠移到card圖片秀背景特效
const cards = document.querySelectorAll('.card')
cards.forEach((card, index) => {


    //滑鼠移入
    card.querySelector('.img-box').addEventListener('mouseenter', (event) => {
        loopUpBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.style.opacity = 0


                cards.forEach((all) => {
                    all.style.opacity = '0.01'
                })

                card.style.opacity = '1'
                card.classList.add('active')
                img = card.querySelector('.img-box img')
                if (img) {
                    src = img.src
                    cover.style.backgroundImage = `url('${src}')`
                    cover.classList.add('active')
                }
            })
        })



    })


    //監控tilt位置，依照x軸變化背景的x位置
    VanillaTilt.init(card)
    card.addEventListener('tiltChange', (event) => {


        //X軸
        cover.style.backgroundPositionX = `${event.detail.percentageX}%`

        //Y軸
        cover.style.backgroundPositionY = `${event.detail.percentageY}px`
    })

    //點愛心
    const heartBtn = card.querySelector('.heart')
    heartBtn.addEventListener('click', () => {
        heartBtn.classList.toggle('active')
        if (likeList.has(index)) {
            likeList.delete(index)
        } else {
            likeList.add(index)
        }
        updateLikesNum()
        upDateListList()
    })

    //複製網址
    const btn = card.querySelector('.copy-btn')
    btn.addEventListener('click', () => {
        const siteText = card.querySelector('.link').querySelector('a').href
        copyLink(siteText);
        btn.querySelector('.copied-text').innerText = '已複製'
        btn.classList.add('active')
        setTimeout(() => {
            btn.querySelector('.copied-text').innerText = '複製網址'
            btn.classList.remove('active')
        }, 1000)
    })

    //滑鼠移出
    card.addEventListener('mouseleave', () => {
        card.querySelector('.lookup').style.opacity = 1

        cards.forEach((all) => {
            all.style.opacity = '1'
        })

        card.classList.remove('active')
        cover.classList.remove('active')
    })

})



//各項目的容器(掛hidden用)
const cardWrappers = document.querySelectorAll('.card-wrapper')

//點擊顯示我的最愛按鈕
showLikeBtn.addEventListener('click', () => {
    if (likeList.size == 0) {
        return
    }


    isLikeMode = !isLikeMode

    if (isLikeMode) {
        //更新按鈕文字+隱藏數字
        varText.innerText = '顯示全部'
        numSpan.classList.add('hidden')

        cardWrappers.forEach((cardWrapper, index) => {
            if (!likeList.has(index)) {
                cardWrapper.classList.add('hidden')
            }
        })
    } else {
        //更新按鈕文字+顯示數字
        varText.innerHTML = '收藏&nbsp;'
        numSpan.classList.remove('hidden')


        cardWrappers.forEach((cardWrapper) => {
            cardWrapper.classList.remove('hidden')

        })
    }

})


//處理選單開關
const switchBtn = document.querySelector('.switch')
const aside = document.querySelector('aside')
const listBox = document.querySelector('.listBox')
const extentAside = document.querySelector('.header-content .left')



//開關
switchBtn.addEventListener('click', () => {
    const isOpen = aside.classList.contains('active')
    if (isOpen) {
        aside.classList.remove('active')
        listBox.classList.remove('active')
        extentAside.classList.remove('active')
    } else {
        aside.classList.add('active')
        listBox.classList.add('active')
        extentAside.classList.add('active')
    }
})

//依照瀏覽器寬度判定開啟關閉Fn
const CheckSize = () => {
    const width = window.innerWidth
    if (width < 768) {
        aside.classList.remove('active')
        listBox.classList.remove('active')
        extentAside.classList.remove('active')
    } else {
        aside.classList.add('active')
        listBox.classList.add('active')
        extentAside.classList.add('active')
    }
}


//調整寬度
window.addEventListener('resize', CheckSize)


//初次載入
window.onload = function () {
   CheckSize()
}


//送出連絡我們
const sendBtn = document.querySelector('.send-btn')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const contentInput = document.querySelector('#content')

sendBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  const sendContent = {
   from_name:nameInput.value,
    from_email:emailInput.value,
    message:contentInput.value
  }

  console.log(sendContent)
   emailjs.send("service_m1wxuhq", "template_sy5htlt",
      sendContent , "JwWG0RFB5tnNN1otl")
      .then(() => {
        alert("Thank you. I will get back to you as soon as possible.");
      },(error)=>{
        setLoading(false)
        console.log(error);
        alert("Something went wrong.");
      })
})

