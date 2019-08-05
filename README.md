# ChatSpace
ChatSpaceのDB設計です。
まだ考え方がしっくり来ません。ご指摘お願いします。

* * *
## userテーブル
    ユーザー情報を保存するテーブル
| Column   | Type   | Options                                    |
| -------- | ------ | ------------------------------------------ |
| name     | string | null: false, index: true, uniqueness: true |
| email    | string | null: false, uniqueness: true              |
| password | string | null: false                                |

    なぜuniqueness trueを指定したのか
    ・name: 検索の際に識別するため
    ・email: 同じメールアドレスを持つユーザーを増やさないため

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members

* * *
## messagesテーブル
    メッセージを保存するテーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| body     | text    | null: false                    |
| image    | string  |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |


### Association
- belongs_to :user
- belongs_to :group
  
* * *
## membersテーブル（中間テーブル）
    どのユーザーがどのグループに関連づいているかという情報が記載されているテーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

* * *
## groupsテーブル
    グループの情報が入ったテーブル
| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |


### Association
- has_many :users, through: :members
- has_many :messages