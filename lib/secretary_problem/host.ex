defmodule AllaisParadox.Host do
  alias AllaisParadox.Main
  alias AllaisParadox.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    :random.seed(:os.timestamp)
    flag = true
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id, Main.new_participants(data) |> Map.put(:joined, Map.size(data.participants))}
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
    Actions.all_reset(data)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:question_text, question_text)
                     |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
                       { id, value |> Map.put(:question_text, question_text) } end), %{}))
    Actions.update_question(data, question_text)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end