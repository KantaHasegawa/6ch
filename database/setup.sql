CREATE TABLE thread (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  title VARCHAR(100) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  active BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE post (
id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
user_name VARCHAR(250) NOT NULL,
content VARCHAR(250) NOT NULL,
created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
thread_id INT UNSIGNED NOT NULL,
PRIMARY KEY (id),
CONSTRAINT post_ibfk_1 FOREIGN KEY (thread_id) REFERENCES thread(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;

DELIMITER //
CREATE PROCEDURE InsertPost()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE random_int INT DEFAULT 1;
  DECLARE random_thread_id INT DEFAULT 1;
  DECLARE post_content VARCHAR(100);
  WHILE 1000 > i DO
    SET random_int = CEIL(RAND() * 3);
    SET random_thread_id = CEIL(RAND() * 100);
    SET post_content = CASE WHEN random_int=1 THEN "草"
      WHEN random_int=2 THEN 'ワロタ'
      WHEN random_int=3 THEN 'ｗｗｗｗｗｗｗｗ'
      ELSE  null END;
    INSERT INTO post (user_name, content, thread_id) VALUES("名無しさん", post_content, random_thread_id);
    SET i = i + 1;
  END WHILE;
END;
//

INSERT INTO thread (title) VALUES ("ワイ上司「エビダンスは？」新卒「え？」ワイ上司「エビダンスだよッ！」");
INSERT INTO thread (title) VALUES ("4番サードジダン");
INSERT INTO thread (title) VALUES ("【朗報】ぬいぐるみみたいなイッヌ見つかる");
INSERT INTO thread (title) VALUES ("八木沼純子さん美人すぎるやろ😨");
INSERT INTO thread (title) VALUES ("馬鹿「こどおじはモテない！w」ワイ天才「へーじゃあワイが一人暮らしすればモテモテになるんか？」");
INSERT INTO thread (title) VALUES ("裁判中にムチ振り回したり、コーヒー飲んでる奴ww");
INSERT INTO thread (title) VALUES ("わかってないカキフライ屋さん");
INSERT INTO thread (title) VALUES ("息子の名前を「真心ってなんだ郎」にしようと思うんやが");
INSERT INTO thread (title) VALUES ("ロシアのプーチン大統領、ウクライナへの侵攻をすでに「決断した」");
INSERT INTO thread (title) VALUES ("【画像】ワイ、フリーター豪遊");
INSERT INTO thread (title) VALUES ("引きこもりデブワイ、椅子から立つだけで息を荒げてしまう");
INSERT INTO thread (title) VALUES ("【悲報】ワイ、ずっと「Abo」だと思っていた");
INSERT INTO thread (title) VALUES ("【】朗報今なら安価スレ撲滅委員会おらんから安価スレ立て放題やぞ！");
INSERT INTO thread (title) VALUES ("アドガードの調子が悪いんやが");
INSERT INTO thread (title) VALUES ("ホグワーツ「スリザリンから闇の魔法使いになるやつ多過ぎやろ……どうにかならんかな……」");
INSERT INTO thread (title) VALUES ("すいかの名産地「意味不明です、結局どこなのかわかりません」←全国の小学校で覇権取った理由");
INSERT INTO thread (title) VALUES ("仮面ライダー龍騎とかいう名作");
INSERT INTO thread (title) VALUES ("国際スケート連盟、ワリエワ問題で大会の年齢制限を17歳に引き上げへ");
INSERT INTO thread (title) VALUES ("天一の一日5杯限定の超こってりの為に行列並ぶ奴wuvwuvwuvwuw");
INSERT INTO thread (title) VALUES ("カーリング女子決勝でなんJが落ちそうな出来事");
INSERT INTO thread (title) VALUES ("ワイがトムとジェリーのアプリで人生をぶっ壊された話");
INSERT INTO thread (title) VALUES ("ジョブチューンのシェフ「匂い嗅いで…料理じっくり見て…使ってる食材とか調理法聞いて…」←これ");
INSERT INTO thread (title) VALUES ("【TBS】ジョブチューン★餃子の王将×超一流料理人★２");
INSERT INTO thread (title) VALUES ("【真理】男のスペック、経済力>>>>>>>>>その他だった");
INSERT INTO thread (title) VALUES ("【悲報】超有名シナリオライター兼音楽プロデューサー「僕はLiSAに十字架を背負わせてしまった」");
INSERT INTO thread (title) VALUES ("なんJ民が好きなビール教えて🤗");
INSERT INTO thread (title) VALUES ("ワイ「熱でた😭」友達「ポカリ飲んで寝ろ」");
INSERT INTO thread (title) VALUES ("アンジャッシュ渡部ばっかり責められてるけと児嶋も賭け麻雀してるじゃん");
INSERT INTO thread (title) VALUES ("彡(ꙮ)(ꙮ)");
INSERT INTO thread (title) VALUES ("ワイ173cm、女の子へのラインが尽く帰ってこない");
INSERT INTO thread (title, active) VALUES ("【急募】努力せずに人生を楽しく生き抜く方法", false);
INSERT INTO thread (title, active) VALUES ("このアニメ頭空っぽにして見れるでござるうぅぅプホッww", false);
INSERT INTO thread (title, active) VALUES ("大相撲「日本の国技は相撲」　NPB「日本の国技は野球」", false);
INSERT INTO thread (title, active) VALUES ("【悲報】生きる気力、湧かない", false);
INSERT INTO thread (title, active) VALUES ("「杉」のつく名字、出来杉しかない", false);
INSERT INTO thread (title, active) VALUES ("埼玉県民集合", false);
INSERT INTO thread (title, active) VALUES ("なんJ民が働く会社の営業利益率なんぼ？", false);
INSERT INTO thread (title, active) VALUES ("【動画】なんj夜の即死、事故、感電動画【gifあり】", false);
INSERT INTO thread (title, active) VALUES ("【謎】なんJ民「ワイ185cmやで」「199cm100kg」←こいつらがチビ煽りでキレる理由wwwww", false);
INSERT INTO thread (title, active) VALUES ("中岡←だれそうぞうした？", false);
INSERT INTO thread (title, active) VALUES ("漫画史上最高のギャグマンガ、決まる", false);
INSERT INTO thread (title, active) VALUES ("パズドラ10周年公式生放送　20", false);
INSERT INTO thread (title, active) VALUES ("最早←これの読み方でIQがわかる", false);
INSERT INTO thread (title, active) VALUES ("3大謎BB「火を吐く出光」「ナイキ先輩」", false);
INSERT INTO thread (title, active) VALUES ("削除されたフォルダを復元したりする？", false);
INSERT INTO thread (title, active) VALUES ("🐱　👈☺あっ野良猫だ", false);
INSERT INTO thread (title, active) VALUES ("「ルイージマンションで炒飯食ってるだけの奴」←こいつ吸い込む必要あった？", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】なんJ民が「いつの間にか諦めていたもの」教えろwywywyywywywywywywywywywwywyywwywywywywywyw", false);
INSERT INTO thread (title, active) VALUES ("つり目の奴に効く蔑称考えようぜ", false);
INSERT INTO thread (title, active) VALUES ("好感度1位絵文字😳、最下位絵文字🤥", false);
INSERT INTO thread (title, active) VALUES ("中島翔哉←こいつが日本代表から消えた理由", false);
INSERT INTO thread (title, active) VALUES ("ユーザー「ゲームをやるのが面倒」プリコネ「クエストをスキップ出来ます、やる必要がありません」", false);
INSERT INTO thread (title, active) VALUES ("マイメロに代わってメンヘラ女御用達になったドンペンくんの魅力", false);
INSERT INTO thread (title, active) VALUES ("ワイアデノイド自称専門家、アデノイドの全ての質問に答える", false);
INSERT INTO thread (title, active) VALUES ("聞いてアロエリーナ♪ちょっと言いにくいんだけど♪", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】なんJを「2文字」で表せywwywywywywywywywywwyywywywwxywywwywywyywywwyywwywyw", false);
INSERT INTO thread (title, active) VALUES ("前なんjで末尾変えるコマンド教えてもらったんやけど", false);
INSERT INTO thread (title, active) VALUES ("これからのご活躍をお祈り申し上げます←これ煽り以外の意味あるか？", false);
INSERT INTO thread (title, active) VALUES ("興奮すると必ず便意を催すワイ、人生がめちゃくちゃ", false);
INSERT INTO thread (title, active) VALUES ("彡(●)(●)「飲め。明日も会おう。」JCにコーヒーやパンを渡す事案発生", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】なんJ民が出会った「最も珍しい苗字」wwywywywywywyywywywywywywywywywywywywywywywyywwywywyw", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】売れそうだったのに売れなかったバンドrock", false);
INSERT INTO thread (title, active) VALUES ("ワイの明日の予定「>>5で>>10を>>15して>>22」に決定", false);
INSERT INTO thread (title, active) VALUES ("2倍のチャーハンｗｗｗ", false);
INSERT INTO thread (title, active) VALUES ("【悲報】ヒソカさん、幻影旅団の飲み会で誰とも喋らず携帯をいじる…", false);
INSERT INTO thread (title, active) VALUES ("超一流の現役軍人に「鬼ヶ島」をどうやって攻め落とすかをシミュレーションして貰ったら", false);
INSERT INTO thread (title, active) VALUES ("javascriptの入門書一通りよんだんやが何作るか？", false);
INSERT INTO thread (title, active) VALUES ("【速報】野党の支持率、ガチで与党を超える　政権交代へ", false);
INSERT INTO thread (title, active) VALUES ("【朗報】ウマ娘の１周年で実装されるキャラ、マチカネタンホイザだと判明する", false);
INSERT INTO thread (title, active) VALUES ("【激報】これの呼び方で出身地が分かるらしいwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwbwwb", false);
INSERT INTO thread (title, active) VALUES ("劉邦　朱元璋　毛沢東「建国の功臣殺すンゴwww」←こいつら", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】「文系が理解できないワード」←ガチでイメージしたワードwywywyywywywywywywywyywywywywyywyw", false);
INSERT INTO thread (title, active) VALUES ("神奈川県民やけどガチで東京より「上」やと思ってる🥺", false);
INSERT INTO thread (title, active) VALUES ("【BS1】カーリング女子 スウェーデンvsスイス★6", false);
INSERT INTO thread (title, active) VALUES ("ワイ「━━━問おう。あなたがワイのマスターか？」←どうする？", false);
INSERT INTO thread (title, active) VALUES ("ダークソウルで一番詰まったボスは？ニワカ「オンスモ」バカ「無名の王」ガイジ「フリーデ」", false);
INSERT INTO thread (title, active) VALUES ("【悲報】水田を破壊したゾウさん、女の子の怒りを買い銃なしで殺害されてしまう", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】「ニートにしかわからないニートの特徴 」←思い浮かべたものywwywwywwyxwyywywwywwywwywywwy", false);
INSERT INTO thread (title, active) VALUES ("三月からバイク教習受けるんだけどこれだけは気をつけろってことある？", false);
INSERT INTO thread (title, active) VALUES ("😁「いいシャツ来てるじゃん！ラブライブだろ？」", false);
INSERT INTO thread (title, active) VALUES ("27歳社会人やけど茶髪にしてる", false);
INSERT INTO thread (title, active) VALUES ("昔の親「人の役にたてる人間になりなさい」「優しい子になってほしい」→今", false);
INSERT INTO thread (title, active) VALUES ("最近あったいい事おしえてくれ😢", false);
INSERT INTO thread (title, active) VALUES ("カップヘッドとかいうゲームやってるんだけどムズすぎんゴ", false);
INSERT INTO thread (title, active) VALUES ("お絵描き伝言ゲーム", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】湘南パイプキャッツ、解散", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】東西に分かれると「東側が必ず勝つ」という事実ywywywywywywywywywywywywywyywywwywywywywywyw", false);
INSERT INTO thread (title, active) VALUES ("【画像】新人美人教師「私の授業で不満な所とかあったら遠慮なく言ってね〜！」", false);
INSERT INTO thread (title, active) VALUES ("【悲報】千葉県でガードレールが盗まれる", false);
INSERT INTO thread (title, active) VALUES ("ワイ「ん？今揺れたよな？せや！なんJ見たろ！」", false);
INSERT INTO thread (title, active) VALUES ("小学校の帰りにこの花の蜜吸ってた奴ｗｗｗｗｗｗｗｗ", false);
INSERT INTO thread (title, active) VALUES ("【衝撃】ガチで「今思うと異常すぎた流行」←ガチでイメージした流行wywywywywywywywywywywyywywywywyw", false);
INSERT INTO thread (title, active) VALUES ("ヒープリの映画みてるけどちょっと雑やろ", false);
INSERT INTO thread (title, active) VALUES ("雀魂課金したら雀聖までこれた", false);
INSERT INTO thread (title, active) VALUES ("📍やぁ", false);
INSERT INTO thread (title, active) VALUES ("【復活のN】巨人 日本の4番中田翔！漢村田修一も絶賛「去年と全然違う復調！」", false);
INSERT INTO thread (title, active) VALUES ("再び転倒の高木菜那「左脚にきた」「ぶつかった」「2年ぶりのレースだった」", false);
INSERT INTO thread (title, active) VALUES ("バンプオブチキン（ドラえもん、ポケモン、ワンピース、コナン、すみっコぐらしとタイアップ）", false);
INSERT INTO thread (title, active) VALUES ("教師「xの2乗の微分は2xです」みんな「はーい！」ワイ「なんでや…」", false);
INSERT INTO thread (title, active) VALUES ("【悲報】自由の国アメリカ、未だに「歯医者ってだけでバカにされる国」だったWIWIWIWIWIWI", false);

CALL InsertPost();
