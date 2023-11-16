export type Props = {
  id: string;
  text: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isEditing: boolean;
}

export interface MovieId {
  text: string;
  id: string;
  isEditing: boolean;
}