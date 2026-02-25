import { Container } from "@mui/material";
import { useState } from "react";

import { AppFooter } from "../shared/layout/AppFooter";
import { AppShell } from "../shared/layout/AppShell";
import { BoardTopBar } from "../shared/layout/board-topbar/BoardTopBar";
import { MobileSearchSheet } from "../shared/layout/MobileSearchSheet";
import { BoardFilterBar } from "../shared/layout/filter-bar/BoardFilterBar";

import { Board } from "../features/tasks/components/board/Board";
import { TaskFormDialog } from "../features/tasks/components/task-form/TaskFormDialog";

export function BoardPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <AppShell
      header={<BoardTopBar onOpenMobileSearch={() => setSearchOpen(true)} />}
      subHeader={<BoardFilterBar />}
      footer={<AppFooter />}
    >
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Board />
      </Container>

      <TaskFormDialog />

      <MobileSearchSheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpen={() => setSearchOpen(true)}
      />
    </AppShell>
  );
}
