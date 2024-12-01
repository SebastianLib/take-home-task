import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  isInitialized: boolean
};

type Actions = {
  setCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleExpanded: (id: number) => void;
  loadPersistedState: () => void;
};

export const useStore = create<State & Actions>((set, get) => ({
  visibleCards: [],
  deletedCards: [],
  isInitialized: false,

  setCards: (cards: ListItem[]) => {
    const updatedVisibleCards = cards.map((card) => ({
      ...card,
      expanded: false, 
    }));
    set(() => ({
      visibleCards: updatedVisibleCards,
      deletedCards: [],
    }));
    localStorage.setItem(
      "cardState",
      JSON.stringify({ visibleCards: updatedVisibleCards, deletedCards: [] })
    );
  },

  deleteCard: (id: number) => {
    const state = get();
    const cardToDelete = state.visibleCards.find((card) => card.id === id);

    if (cardToDelete) {
      const updatedState = {
        visibleCards: state.visibleCards.filter((card) => card.id !== id),
        deletedCards: [...state.deletedCards, cardToDelete],
      };

      set(() => updatedState);
      localStorage.setItem("cardState", JSON.stringify(updatedState));
    }
  },

  toggleExpanded: (id: number) => {
    set((state) => {
      const toggleCardExpanded = (card: ListItem) =>
        card.id === id ? { ...card, expanded: !card.expanded } : card;
  
      const updatedState = {
        visibleCards: state.visibleCards.map(toggleCardExpanded),
        deletedCards: state.deletedCards.map(toggleCardExpanded),
      };
  
      localStorage.setItem("cardState", JSON.stringify(updatedState));
      return updatedState;
    });
  },
  

  loadPersistedState: () => {
    const persistedState = JSON.parse(localStorage.getItem("cardState") || "{}");
    if (persistedState) {
      set(() => ({
        visibleCards: persistedState.visibleCards || [],
        deletedCards: persistedState.deletedCards || [],
        isInitialized: true,
      }));
    } else {
      set(() => ({
        isInitialized: true
      }));
    }
  },
}));
