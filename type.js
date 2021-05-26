const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = [
  'hello','my hero academia','welcome','iphone',
  'morning','typing', 'programming','today','chrome','firefox',
  'masaki','suzuki','yuka','fujishita','let it be','edge',
  'just married','google','apple','amazon','windows','mac',
  'aihara','yuji','kenji','kenichi',
]; // テキストを格納する配列

let checkTexts = [];
let score = 0;
let mistake  = 0;

const createText = () => {
  const p = document.getElementById('text');
  const rnd = Math.floor(Math.random() * textLists.length);
  p.textContent = '';
  checkTexts = textLists[rnd].split('').map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  })
};// ランダムなテキストを画面に表示

start.addEventListener('click', () => {
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keydown', keyDown);  
})

const keyDown = e => {
  if(e.key === checkTexts[0].textContent){
    wrap.style.backgroundColor = '#666';
    checkTexts[0].className = 'add-color';
    checkTexts.shift();
    score++;
    if(!checkTexts.length) createText();
  } else if(e.key === 'Shift') {
    wrap.style.backgroundColor = '#666';
  }else{
    wrap.style.backgroundColor = 'red';
    mistake++;
  }
}; // キーイベント＆入力判定処理

const rankCheck = rank => {
  let text = '';
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  }else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  }else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  }else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`; 
  }
  return `入力数：${score}文字\n誤入力：${mistake}回\n${text}\n【OK】リトライ／【キャンセル】終了`;
}; // ランク判定とメッセージ生成処理

const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));
  if(result) window.location.reload();
}; // ゲームの終了処理

const timer = () => {
  let time = 60;
  const count = document.getElementById('count');
  const id = setInterval(() => {
    if(time <= 0) gameOver(id);
    count.textContent = time--;
  }, 1000);
}; // タイマー処理


start.addEventListener('click', () => {}); // ゲームスタート時の処理