"use client";

import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ScheduleNewMeeting from "./schedule-new-meeting";
import MeetingList from "./meeting-list";

export default function ScheduleMeeting() {
  return (
    <section className="p-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-2">
          <TabsTrigger className="h-10" value="account">
            My Schedules
          </TabsTrigger>
          <TabsTrigger className="h-10" value="password">
            Schedule Meeting
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
}
