"use client";
import { useContractEvent, useContractRead } from "wagmi";

import Contract from "../../contract/Media.json";
import { CONTRACT_ADDRESS } from "@/constants/value";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/data/store";
import { IPost, addPost, loadPost, selectPost } from "@/data/slice/post";

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  // const [message, setMessage] = useState<any[]>([]);
  const message = useSelector(selectPost);

  useContractEvent({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    eventName: "Post",
    listener(log) {
      if (log) {
        // setMessage((pre) => [...pre, (log[0] as any).args]);
        dispatch(addPost((log[0] as any).args));
      }
    },
  });

  useContractRead({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "getPost",
    onSuccess: (data) => {
      // setMessage([...(data as any[])]);
      dispatch(loadPost(data as IPost[]));
    },
  });

  return (
    <>
      <div className="flex flex-col items-center space-y-4 w-full p-4 flex-1">
        {message.map((item: any, index: number) => {
          return (
            <div
              className="flex flex-col items-end justify-between space-y-4 max-w-lg w-full border border-solid rounded border-black p-4"
              key={index}
            >
              <div className="w-full">
                <span>{item.message}</span>
              </div>
              <div className="flex flex-row items-center justify-end">
                <span className="text-xs font-bold">{item.sender}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
