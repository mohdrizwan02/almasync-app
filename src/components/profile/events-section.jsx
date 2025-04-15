"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Plus, ExternalLink } from "lucide-react";

export default function EventsSection({ postedEvents, registeredEvents }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="posted" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="posted">Posted Events</TabsTrigger>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </div>

        <TabsContent value="posted">
          <Card>
            <CardHeader>
              <CardTitle>Events You've Posted</CardTitle>
              <CardDescription>
                Manage your events and view registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {postedEvents && postedEvents.length > 0 ? (
                <div className="space-y-4">
                  {postedEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-semibold">{event.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">
                              {event.registrations} registrations
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't posted any events yet
                  </p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registered">
          <Card>
            <CardHeader>
              <CardTitle>Events You've Registered For</CardTitle>
              <CardDescription>Track events you're attending</CardDescription>
            </CardHeader>
            <CardContent>
              {registeredEvents && registeredEvents.length > 0 ? (
                <div className="space-y-4">
                  {registeredEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-semibold">{event.title}</h3>
                          </div>
                          <div className="flex flex-col ml-7">
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Organized by: {event.organizer}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Event
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't registered for any events yet
                  </p>
                  <Button variant="outline">Browse Upcoming Events</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
