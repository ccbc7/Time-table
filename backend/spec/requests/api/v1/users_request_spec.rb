RSpec.describe "Api::V1::Users", type: :request do
  let!(:users) { create_list(:user, 10) }

  describe "GET /api/v1/users" do
    it "すべてのユーザーを返すこと" do
      get api_v1_users_path
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.length).to eq 10
    end
  end

  describe "GET /api/v1/users/:id" do
    context "ユーザーが存在する場合" do
      it "ユーザーを返すこと" do
        get api_v1_user_path(users.first.user_id)
        expect(response.status).to eq 200
        json = JSON.parse(response.body)
        expect(json["username"]).to eq users.first.username
      end
    end

    context "ユーザーが存在しない場合" do
      it "404エラーを返すこと" do
        get api_v1_user_path("nonexisting")
        expect(response.status).to eq 404
      end
    end
  end


  describe "POST /api/v1/users" do
    let(:user_params) { { username: "New User", bio: "New User Bio", user_id: "newuser123" } }

    context "パラメータが有効な場合" do
      it "新しいユーザーを作成し、そのユーザーを返すこと" do
        post api_v1_users_path, params: { user: user_params }
        expect(response.status).to eq 201
        json = JSON.parse(response.body)
        expect(json["username"]).to eq "New User"
      end
    end
  end

  describe "PATCH /api/v1/users/:id" do
    let(:update_params) { { username: "Updated Test User" } }

    context "パラメータが有効な場合" do
      it "ユーザー情報を更新し、更新されたユーザーを返すこと" do
        patch api_v1_user_path(users.first.user_id), params: { user: update_params }
        expect(response.status).to eq 200
        json = JSON.parse(response.body)
        expect(json["username"]).to eq "Updated Test User"
      end
    end
  end
end
