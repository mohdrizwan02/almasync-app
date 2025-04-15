"use client";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const users = [
  { id: "user1", name: "Alice" },
  { id: "user2", name: "Bob" },
];

export default function UsersPage() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [pageLoad, setPageLoad] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: "user3",
    name: "Charlie",
  });

  const pathname = usePathname();

  useEffect(() => {
    useUser()
      .then((response) => {
        setUserId((prev) => response.userId);
        setUsername((prev) => response.name);
        setPageLoad((prev) => false);
      })
      .catch((error) => {
        console.log("error occurred");
      });
  }, []);

  return (
    <>
      {pageLoad ? (
        <div>loading</div>
      ) : (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4"></h1>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                <Link
                  href={`${pathname}/${user.id}`}
                  className="text-blue-500 underline"
                >
                  Chat with {username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
