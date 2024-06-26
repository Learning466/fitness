import { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Schedule, User} from "@prisma/client";

interface ScheduleWithUser {
  id: string;
  date: string | null;
  time: string | null;
  meetingLink: string | null;
  memberId: string | null;
  subject: string | null;
  body: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  User: User | null;
}

export default function MeetingList({ data, user }: { data: ScheduleWithUser[], user:User }) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
        <CardDescription>
          View and manage your upcoming meetings.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[450px] p-2 overflow-y-auto">
        <div className="grid gap-2 pb-20 capitalize  ">
          {data?.map((meeting) => (
            <Card key={meeting?.id} className="bg-secondary">
              <CardHeader>
                <CardTitle className="flex flex-row items-start gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {meeting?.subject}
                </CardTitle>
                <p className="text-muted-foreground font-normal">{`Message: ${meeting?.body}`}</p>
                <CardDescription>
                  <span>{`Timing: ${meeting?.time} • ${meeting?.date}`}</span>
                  <br />
                  <span>{`To: ${meeting?.memberId === user?.email ? "ME" : meeting?.memberId}`}</span>
                  <br/>
                  <span>{`From: ${meeting?.userId === user?.id ? "ME" : meeting?.User?.email}`}</span>
                </CardDescription>{" "}
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
