module Types
  class QueryType < Types::BaseObject
    # Get all projects
    field :projects, [ Types::ProjectType ], null: false

    def projects
      Project.all
    end

    # Get a single project by id
    field :project, Types::ProjectType, null: false do
      argument :id, ID, required: true
    end

    def project(id:)
      Project.find(id)
    end
  end
end
