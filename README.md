# Time table

# 作品
**github**

https://github.com/ccbc7/Time-table

**サイトURL**

https://prod.time-table01.com/

# アプリについて #
https://prod.time-table01.com
施設の中で、いつ、誰がどの施設を使っているのかがわかります。また、自分が使用したい施設を予約し、カレンダーに合わせて自身の予定を確認することができます。

# 技術
**フロントエンド**
| 使用技術 | 詳細 |
|-----|-----|
| Next.js (13.4.3)| フロントエンドフレームワーク |
|firebase|外部APIと連携|
| Tailwind CSS | CSSフレームワーク| 
| Tailwind UI | UIコンポーネント| 

**バックエンド**
| 使用技術 | 詳細 |
|-----|-----|
| rails7 (7.0.4.3)|  Apiモード |
| MySQL | データベース| 
| Rspec | リクエストスペック・モデルスペックのテストを実行します。| 
| Rubocop | コードスタイルの一貫性を維持してくれます。| 

**インフラ**
| 使用技術 | 詳細 |
|-----|-----|
|ECS|AWSの強力なコンテナオーケストレーションサービスです！|
| RDS | AWSのデータベースで、MySQLをRDSで管理します。| 
| S3 |画像を保存するために使用します。 | 
| Route53 | お名前.comで登録したドメインのドメイン登録と管理を行います。| 
|ACM|取得ドメインに対してSSL/TLS証明書を発行してくれます。|
|AWS systems manager|パラメータストアで機密情報を安全に保存・管理できます。|
|AWS Copilot CLI|AWSのコンテナ化されたアプリケーションを簡単にデプロイ・管理できます。|
|Terraform|VPCやRDSなどの設定のコード面での可視化を目指しました。|
|Docker|バージョン管理やビルド手順の定義が非常に開発に助かります。|
|docker-compose|フロントエンドとバックエンド両方のコンテナを扱う上で重宝しました。|
|github actions|github上でスムーズにCICDフローを構築し、ECSへアップロードするまでの手順を非常に簡単にすることができます。|

**全体設計**
![名称未設定.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/89523988-8dd7-8a00-86b9-8893eb689d00.png)
![名称未設定 (2).jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/316f9395-4598-73bc-7944-2e4178d4072e.jpeg)


#### 開発にあたって
学校に勤めていたときの経験をもとに、以下のような背景がありました。
・総合学園だったので、幼稚園から高校まで多くの団体があり、それぞれの団体が同じ場所を使いたいときがある。ときによっては、団体同士が鉢合わせし、施設の使用に支障がでてしまうときがありました。
・学校現場では職員室内の黒板に、その日の施設の使用申請が書かれていました。しかし、施設内で自分が確認したいときに毎回職員室へ行き、予定を確認しなければいけないという状態でした。教員は基本的に時間がないので、すぐに予定を確認でき、施設使用を申請できたらいいなと感じていました。
そこで、本アプリの作成を決めました。

#### 機能紹介
**Topページ**
・カレンダーで本日予約している内容がすぐにわかります。
<br>
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/de6f47d9-6292-d265-4251-03cde4efe0d6.png)

**ログインページ**
・firebaseを使用したログイン機能です。ゲストログイン,メールアドレスログイン、グーグルログインを実装。ログイン後、rails側にユーザー情報を送信します。
![画面収録_2023-07-05_22_22_42_AdobeExpress.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/25975a81-7903-0fb4-5f58-b35f8bdcdbaa.gif)

**施設登録**
施設を登録することができます。
![画面収録_2023-07-05_22_35_34_AdobeExpress (1).gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/c4667a4e-2199-416d-4c96-f2f1d0e34014.gif)

**予約登録**
登録した施設をもとに、施設を予約することができますカレンダーを使用し、他の利用者との兼ね合いをみます。
![画面収録_2023-07-05_22_46_22_AdobeExpress.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/102470e0-8550-2997-1652-07d5a6f075c3.gif)

**施設検索**
施設が増えてきた場合、検索機能が役立ちます！
![画面収録_2023-07-05_22_57_18_AdobeExpress.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3304584/b8f7078b-0b83-0bb9-4cb4-bddaff46f420.gif)

# 機能一覧
| 機能名 | 説明 |
|-----|-----|
|ログイン機能|サインアップ・サイインイン・ログアウト|
| 施設登録機能|施設を登録できます。|
| 施設検索機能|登録した施設を検索できます。|
| 予約機能 |登録した施設を予約できます。| 
| 予約確認機能 |登録した予約を確認できます。 | 
|プロフィール機能|プロフィール情報を編集できます。|
| 通知機能 |ベルアイコンを押すと最近の予約5件を確認できます。| 
|コメント機能|施設ごとに施設に対してのコメントを登録できます。|
|時間設定機能|時間割に使うワードの登録と変更ができます。|


