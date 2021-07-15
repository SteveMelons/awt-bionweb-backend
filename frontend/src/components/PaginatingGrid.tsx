import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { User } from "../types/User";
import StudectCard from "./StudectCard";

interface PaginatingGridProps {
  users: User[];
  onClickFavorite: (id: string) => void;
  onLoadMore?: (newPagination: { limit: number; offset: number }) => void;
  initialLimit?: number;
  loadLimit?: number;
}

const PaginatingGrid: React.FC<PaginatingGridProps> = ({
  users,
  onClickFavorite,
  onLoadMore,
  initialLimit,
  loadLimit,
}) => {
  let paginationState: [
    {
      limit: number;
      offset: number;
    },
    React.Dispatch<
      React.SetStateAction<{
        limit: number;
        offset: number;
      }>
    >
  ];
  if (onLoadMore && initialLimit && loadLimit) {
    paginationState = useState({
      limit: initialLimit,
      offset: 0,
    });
  }

  return (
    <Box
      sx={{
        width: "90%",
        margin: "2em auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(22em, 1fr))",
        gap: "1.3em",
      }}
    >
      {users.map((user, i) => (
        <StudectCard
          key={user.id}
          color={i % 3}
          user={user}
          onClickFavorite={(id) => {
            onClickFavorite(id);
          }}
        />
      ))}
      {onLoadMore && initialLimit && loadLimit && (
        <Button
          onClick={async () => {
            const [pagination, setPagination] = paginationState;
            const newPagination = {
              limit: loadLimit,
              offset: pagination.offset + pagination.limit,
            };
            setPagination(newPagination);
            onLoadMore(newPagination);
          }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default PaginatingGrid;
