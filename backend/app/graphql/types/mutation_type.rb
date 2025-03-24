module Types
  class MutationType < BaseObject
    field :update_project, mutation: Mutations::UpdateProject
    field :delete_project, mutation: Mutations::DeleteProject
  end
end