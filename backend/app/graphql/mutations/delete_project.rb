module Mutations
  class DeleteProject < BaseMutation
    argument :id, ID, required: true

    field :project, Types::ProjectType, null: true
    field :errors, [ String ], null: false

    def resolve(id:)
      project = Project.find_by(id: id)
      return { project: nil, errors: [ "Project not found" ] } unless project

      if project.destroy
        { project: project, errors: [] }
      else
        { project: nil, errors: project.errors.full_messages }
      end
    rescue StandardError => e
      { project: nil, errors: [ e.message ] }
    end
  end
end
