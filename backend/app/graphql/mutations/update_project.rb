module Mutations
  class UpdateProject < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: true
    argument :deleted_task_ids, [ID], required: false

    field :project, Types::ProjectType, null: true
    field :errors, [String], null: false

    def resolve(id:, name:, deleted_task_ids: [])
      project = Project.find_by(id: id)
      return { project: nil, errors: ["Project not found"] } unless project

      project.name = name

      Project.transaction do
        if deleted_task_ids.present?
          tasks_to_delete = project.tasks.where(id: deleted_task_ids)
          tasks_to_delete.destroy_all
        end

        if project.save
          { project: project, errors: [] }
        else
          { project: nil, errors: project.errors.full_messages }
        end
      end
    rescue ActiveRecord::RecordNotFound => e
      { project: nil, errors: [e.message] }
    end
  end
end