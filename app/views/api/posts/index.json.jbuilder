@posts.each do |post|
  json.set! post.id do
    json.extract! post, :user_id, :description, :location
    json.created_at post.created_at.to_i
    json.picture_url post.picture_url.url
    json.set! 'user' do
      json.username post.user.username
      json.avatar_url post.user.avatar.url
    end
  end
end
