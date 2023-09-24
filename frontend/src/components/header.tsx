"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  useAccount,
} from "wagmi";
import { Button, Modal, Input } from "antd";

import Contract from "../../contract/Media.json";
import React from "react";
import { CONTRACT_ADDRESS } from "@/constants/value";
import { AppDispatch } from "@/data/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollower,
  addUser,
  loadFollower,
  loadUser,
  selectUser,
} from "@/data/slice/user";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = React.useState(false);
  const [openFollowerList, setOpenFollowerList] = React.useState(false);
  const [openUserList, setOpenUserList] = React.useState(false);
  const [post, setPost] = React.useState("");

  const followerList = useSelector(selectUser).follower;
  const userList = useSelector(selectUser).user;

  const { address, isConnecting, isDisconnected } = useAccount();

  const makePost = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "makePost",
  });

  const followPeople = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "followPeople",
  });

  useContractEvent({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    eventName: "CreateUserEvent",
    listener(log) {
      if (address !== ((log[0] as any).args as any).account) {
        dispatch(addUser(((log[0] as any).args as any).account as string));
      }
    },
  });

  useContractRead({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "getFollower",
    onSuccess(data) {
      if (data) {
        dispatch(loadFollower(data as string[]));
      }
    },
  });

  useContractRead({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "getAllUsers",
    onSuccess(data) {
      if (data) {
        dispatch(loadUser(data as string[]));
      }
    },
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full p-4">
        <ConnectButton />
        <div className="flex flex-row items-center justify-center space-x-2">
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            size="large"
            loading={makePost.isLoading}
          >
            Post
          </Button>
          <Button
            type="primary"
            onClick={() => setOpenUserList(true)}
            size="large"
          >
            User List
          </Button>
          <Button
            type="primary"
            onClick={() => setOpenFollowerList(true)}
            size="large"
          >
            Follower List
          </Button>
        </div>
      </div>
      <Modal
        title="Post"
        open={open}
        onOk={() => {
          makePost.write({ args: [post] });
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter Post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </Modal>
      <Modal
        title="User List"
        open={openUserList}
        onOk={() => {
          setOpenUserList(false);
        }}
        onCancel={() => {
          setOpenUserList(false);
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-2 w-full px-2 py-4">
          {userList.map((address: string, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between w-full"
              >
                <span>{address.toString().substring(0, 15) + "....."}</span>
                <Button
                  className="text-white"
                  onClick={async () => {
                    await followPeople.writeAsync({
                      args: [address.toString()],
                    });
                    dispatch(addFollower(address));
                  }}
                >
                  Follow
                </Button>
              </div>
            );
          })}
        </div>
      </Modal>
      <Modal
        title="Follower List"
        open={openFollowerList}
        onOk={() => {
          setOpenFollowerList(false);
        }}
        onCancel={() => {
          setOpenFollowerList(false);
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-2 w-full px-2 py-4">
          {followerList.map((address: string, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between w-full"
              >
                <span>{address.toString().substring(0, 15) + "....."}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
