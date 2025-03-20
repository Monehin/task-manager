project1 = Project.create!(name: "Project Alpha")
project2 = Project.create!(name: "Project Beta")

# Seed tasks for project1
5.times do |i|
  project1.tasks.create!(name: "Alpha Task #{i + 1}")
end

# Seed tasks for project2
5.times do |i|
  project2.tasks.create!(name: "Beta Task #{i + 1}")
end
