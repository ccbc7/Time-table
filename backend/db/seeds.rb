locations_data = [
  {
    user_id: "BMBmVbe00PRReyoE3wCsghKfxwg1",
    location_name: "サンプル施設1",
    location_info: "サンプル施設情報1",
    image_path: 'public/sample_facility.png'
  },
  {
    user_id: "BMBmVbe00PRReyoE3wCsghKfxwg1",
    location_name: "サンプル施設2",
    location_info: "サンプル施設情報2",
    image_path: 'public/sample_facility2.png'
  },
  {
    user_id: "BMBmVbe00PRReyoE3wCsghKfxwg1",
    location_name: "サンプル施設3",
    location_info: "サンプル施設情報3",
    image_path: 'public/sample_facility3.png'
  },
  {
    user_id: "BMBmVbe00PRReyoE3wCsghKfxwg1",
    location_name: "サンプル施設4",
    location_info: "サンプル施設情報4",
    image_path: 'public/sample_facility4.png'
  }
]

if Location.count.zero?
  locations_data.each do |location_data|
    location = Location.create(location_data.except(:image_path))
    location.image.attach(
      io: File.open(Rails.root.join(location_data[:image_path])),
      filename: File.basename(location_data[:image_path]),
      content_type: 'image/png'
    )
  end
end


if Hour.count.zero?
  hours = [
    "朝",
    "1時間目",
    "2時間目",
    "3時間目",
    "4時間目",
    "昼休み",
    "5時間目",
    "6時間目",
    "放課後",
    "",
    "",
    "",
    "",
    ""
  ]

  hours.each do |hour|
    Hour.create(period: hour)
  end
end
