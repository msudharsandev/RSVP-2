'use client';

import Container from '@/components/common/Container';
import Timeline from '@/components/planned-events/Timeline';
import NullScreen from '@/components/common/NullScreen';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlannedEvents = () => {
  return (
    <Tabs defaultValue="upcoming">
      <Container asChild>
        <main className="mt-8 flex select-none flex-col justify-start md:justify-normal">
          <section className="mb-12 flex flex-col items-start justify-between gap-5 md:flex-row">
            <h1 className="text-3xl font-semibold md:text-3xl">
              Your Planned <span className="text-primary">Events</span>
            </h1>

            <TabsList className="grid h-10 w-full max-w-[193px] grid-cols-2 items-center justify-center rounded-md bg-dark-500 p-1 text-muted-foreground">
              <TabsTrigger
                value="upcoming"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm border-b-0 px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm border-b-0 px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Past
              </TabsTrigger>
            </TabsList>
          </section>

          <TabsContent value="upcoming">
            <Timeline />
          </TabsContent>

          <TabsContent value="past">
            <NullScreen />
          </TabsContent>
        </main>
      </Container>
    </Tabs>
  );
};

export default PlannedEvents;
