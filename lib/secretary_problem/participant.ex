defmodule SecretaryProblem.Participant do
  alias SecretaryProblem.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def next_question(data, id) do
    data = data |> put_in([:participants, id, :slideIndex], data.participants[id].slideIndex + 1)
    Actions.next_question(data, id)
  end

  def finish(data, id) do
    data = data |> put_in([:participants, id, :answer], data.participants[id].slideIndex)
                    |> put_in([:participants, id, :slideIndex],
                      case data.question_text["secretaries"] do
                        nil -> data.question_text.secretaries
                        _   -> data.question_text["secretaries"]
                      end)
                    |> Map.put(:answered, data.answered + 1)
    Actions.finish(data, id)
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end
