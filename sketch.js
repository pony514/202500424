let homeButton, introButton, portfolioButton, feedButton;
let introDropdown, portfolioDropdown;
let iframe;
let fish = [];
let food = []; // 儲存紅點的陣列

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布為視窗大小

  // 創建按鈕
  homeButton = createButton('首頁');
  introButton = createButton('淡江教科系介紹');
  portfolioButton = createButton('作品集');
  feedButton = createButton('餵魚'); // 新增餵魚按鈕

  // 設置按鈕位置
  homeButton.position(20, 20);
  introButton.position(20, 60);
  portfolioButton.position(20, 100);
  feedButton.position(windowWidth - 100, windowHeight - 50); // 餵魚按鈕放在右下角

  // 綁定按鈕事件
  homeButton.mousePressed(closeIframe);
  introButton.mousePressed(toggleIntroDropdown);
  portfolioButton.mousePressed(togglePortfolioDropdown);
  feedButton.mousePressed(feedFish); // 綁定餵魚按鈕事件

  // 創建 30 條魚
  for (let i = 0; i < 50; i++) {
    fish.push(new Fish());
  }
}

function draw() {
  background(0, 150, 255); // 藍色背景，模擬水的顏色

  // 更新並顯示每條魚
  for (let f of fish) {
    f.move();
    f.display();
  }

  // 更新並顯示紅點
  for (let i = food.length - 1; i >= 0; i--) {
    food[i].move();
    food[i].display();

    // 檢查紅點是否碰到魚
    for (let f of fish) {
      let d = dist(food[i].x, food[i].y, f.x, f.y);
      if (d < f.size / 2) {
        f.size += 10; // 碰到紅點的魚變大
        food.splice(i, 1); // 移除紅點
        break;
      }
    }

    // 如果紅點超出畫布，移除紅點
    if (food[i] && food[i].y > height) {
      food.splice(i, 1);
    }
  }

  // 在右上角顯示提示文字
  fill(255);
  textSize(16);
  textAlign(RIGHT, TOP);
  text('滑鼠靠近魚會躲開', width - 20, 20);
  text('按下餵魚鍵魚會變大', width - 20, 40); // 新增提示文字
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小

  // 調整按鈕位置
  homeButton.position(20, 20);
  introButton.position(20, 60);
  portfolioButton.position(20, 100);
  feedButton.position(windowWidth - 100, windowHeight - 50); // 調整餵魚按鈕位置

  // 調整下拉選單位置（如果存在）
  if (introDropdown) introDropdown.position(20, 100);
  if (portfolioDropdown) portfolioDropdown.position(20, 140);

  // 調整 iframe 位置（如果存在）
  if (iframe) iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2);
}

// 切換淡江教科系介紹下拉選單
function toggleIntroDropdown() {
  if (introDropdown) {
    introDropdown.remove(); // 如果已存在，移除下拉選單
    introDropdown = null;
  } else {
    introDropdown = createSelect();
    introDropdown.position(20, 100);
    introDropdown.option('淡江教科系網');
    introDropdown.option('教學影片');

    // 綁定選項事件
    introDropdown.changed(handleIntroSelection);
  }
}

// 處理淡江教科系介紹選單的選擇
function handleIntroSelection() {
  const selectedOption = introDropdown.value();
  if (selectedOption === '淡江教科系網') {
    if (iframe) iframe.remove(); // 如果已存在 iframe，先移除
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    iframe.attribute('width', '800');
    iframe.attribute('height', '600');
    iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設定 iframe 的位置為畫面正中間
  } else if (selectedOption === '教學影片') {
    if (iframe) iframe.remove(); // 如果已存在 iframe，先移除
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882023/1122/week1/20240219_094929.mp4'); // 替換為教學影片的網址
    iframe.attribute('width', '800');
    iframe.attribute('height', '600');
    iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設定 iframe 的位置為畫面正中間
  } else if (iframe) {
    iframe.remove(); // 如果選擇其他選項，移除 iframe
    iframe = null;
  }
}

// 切換作品集下拉選單
function togglePortfolioDropdown() {
  if (portfolioDropdown) {
    portfolioDropdown.remove(); // 如果已存在，移除下拉選單
    portfolioDropdown = null;
  } else {
    portfolioDropdown = createSelect();
    portfolioDropdown.position(20, 140);
    portfolioDropdown.option('自我介紹');
    portfolioDropdown.option('作品集');
    portfolioDropdown.option('測驗卷');

    // 綁定選項事件
    portfolioDropdown.changed(handlePortfolioSelection);
  }
}

// 處理作品集選單的選擇
function handlePortfolioSelection() {
  const selectedOption = portfolioDropdown.value();
  if (selectedOption === '自我介紹') {
    if (iframe) iframe.remove(); // 如果已存在 iframe，先移除
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://drive.google.com/file/d/1qb61Npo6gxI032nU9wxZhqYGgB4f3-Rk/view?usp=sharing'); // 替換為 PDF 檔案的實際路徑
    iframe.attribute('width', '800');
    iframe.attribute('height', '600');
    iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設定 iframe 的位置為畫面正中間
  } else if (selectedOption === '作品集') {
    if (iframe) iframe.remove(); // 如果已存在 iframe，先移除
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://hackmd.io/@poponini/H1GfH5Dkee'); // 替換為作品集的網址
    iframe.attribute('width', '800');
    iframe.attribute('height', '600');
    iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設定 iframe 的位置為畫面正中間
  } else if (selectedOption === '測驗卷') {
    if (iframe) iframe.remove(); // 如果已存在 iframe，先移除
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://docs.google.com/forms/d/e/1FAIpQLSew_B7A0UElCYcPb6q5ZTOx5nqiGZaSTyM3tcVAO1NYtAV2SQ/viewform?usp=header'); // 替換為測驗卷的網址
    iframe.attribute('width', '800');
    iframe.attribute('height', '600');
    iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設定 iframe 的位置為畫面正中間
  } else if (iframe) {
    iframe.remove(); // 如果選擇其他選項，移除 iframe
    iframe = null;
  }
}

// 關閉 iframe 的函數
function closeIframe() {
  if (iframe) {
    iframe.remove(); // 移除 iframe
    iframe = null;
  }
}

// 餵魚按鈕的功能
function feedFish() {
  feeding = true; // 開啟餵魚狀態

  // 隨機生成 1~5 個紅點
  let foodCount = floor(random(1, 6));
  for (let i = 0; i < foodCount; i++) {
    food.push(new Food(random(width), 0)); // 紅點從隨機 x 位置掉落
  }

  setTimeout(() => {
    feeding = false; // 2 秒後結束餵魚狀態
  }, 2000);
}

// 魚的類別
class Fish {
  constructor() {
    this.x = random(width); // 隨機初始 x 位置
    this.y = random(height); // 隨機初始 y 位置
    this.size = random(20, 50); // 隨機大小
    this.speed = random(1, 3); // 隨機正常速度
    this.fastSpeed = this.speed * 3; // 快速移動速度
    this.color = color(random(255), random(255), random(255)); // 隨機顏色
  }

  // 魚的移動
  move() {
    let d = dist(mouseX, mouseY, this.x, this.y); // 計算滑鼠與魚的距離
    if (d < 100) {
      // 如果滑鼠靠近，快速移動遠離滑鼠
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      this.x += cos(angle) * this.fastSpeed;
      this.y += sin(angle) * this.fastSpeed;
    } else {
      // 正常速度移動
      this.x += this.speed;
    }

    // 當魚超出畫布時，從另一側重新出現
    if (this.x > width) this.x = -this.size;
    if (this.x < -this.size) this.x = width;
    if (this.y > height) this.y = -this.size;
    if (this.y < -this.size) this.y = height;
  }

  // 顯示魚
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size * 1.5, this.size); // 魚的身體
    triangle(
      this.x - this.size / 2,
      this.y,
      this.x - this.size,
      this.y - this.size / 4,
      this.x - this.size,
      this.y + this.size / 4
    ); // 魚的尾巴
  }
}

// 紅點類別
class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10; // 紅點大小
    this.speed = random(2, 5); // 紅點掉落速度
  }

  // 紅點移動
  move() {
    this.y += this.speed; // 向下掉落
  }

  // 顯示紅點
  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
