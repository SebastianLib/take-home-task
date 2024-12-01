import { useEffect, useState } from "react";
import { useStore } from "../store";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import ToggleButton from "./ToggleButton";
import { Card } from "./List";

export const Entrypoint = () => {
  const [reveal, setReveal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const listQuery = useGetListData();
  const {
    visibleCards,
    deletedCards,
    setCards,
    loadPersistedState,
    isInitialized,
  } = useStore();

  useEffect(() => {
    loadPersistedState();
  }, []);

  useEffect(() => {
    if (isInitialized && listQuery.data && visibleCards.length === 0) {
      setCards(listQuery.data);
    }
  }, [isInitialized, listQuery.data, visibleCards.length, setCards]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const refetchResult = await listQuery.refetch();
    if (refetchResult.data) {
      setCards(refetchResult.data);
    }
    setIsRefreshing(false);
    setReveal(false);
  };

  if (listQuery.isLoading || isRefreshing) {
    return <Spinner />;
  }

  return (
    <div className="py-16 space-y-8 w-full flex flex-col items-center">
      <button
        onClick={handleRefresh}
        className="text-white text-lg transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-10 py-2"
      >
        Refresh List
      </button>
      <div className="flex flex-col items-center gap-y-16 md:gap-y-0 md:items-start md:flex-row gap-x-16 w-full justify-center">
        <div className="w-full max-w-xl">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List (
            {visibleCards.length})
          </h1>
          <div className="flex flex-col gap-y-3">
            {visibleCards
              
              .map((card) => (
                <Card key={card.id} card={card} />
              ))}
          </div>
        </div>
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 font-medium text-lg">
              Deleted Cards {deletedCards.length}
            </h1>
              <ToggleButton
                isToggled={reveal}
                toggleState={() => setReveal((prev) => !prev)}
                labelOn="unreveal"
                labelOff="reveal"
                disabled={deletedCards.length === 0}
              />
          </div>
          <div className="flex flex-col gap-y-3">
            {reveal &&
              deletedCards.map((card) => (
                <Card key={card.id} card={card} isDeleted={true} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
