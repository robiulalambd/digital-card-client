import { setTicket } from "@/redux/features/globals/globalsSlice";
import { useIsMatchedTicketMutation } from "@/redux/features/template/templateApi";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const TicketForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [errorResult, setErrorResult] = useState("");
  const [isMatchedTicket, { isLoading }] = useIsMatchedTicketMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleSave = async (data) => {
    const options = {
      data: data,
      id: id,
    };
    const result = await isMatchedTicket(options);
    if (result?.data?.success) {
      if (result?.data?.valid) {
        dispatch(setTicket(result?.data?.data));

        toast.success("Ticket Verification Success!");
      } else {
        setErrorResult("Ticket Credentials Not Valid");
        toast.error("Ticket Credentials Not Valid");
      }
    } else {
      toast.error(result.data?.message);
    }
  };
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <div className="w-full">
        <h1 className="text-center py-4 font-bold text-xl text-black">
          Ticket Verification
        </h1>
        <form
          onSubmit={handleSubmit(handleSave)}
          className="max-w-[400px] w-full mx-auto bg-white h-fit px-3 py-5 rounded-md shadow border"
        >
          <div className="mb-4">
            <span className="block tracking-[0.26px] leading-[16px] text-black text-sm mb-1">
              Email
            </span>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full h-10 bg-gray-100 outline-none px-2 rounded text-sm"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <span className="block tracking-[0.26px] leading-[16px] text-black text-sm mb-1">
              Code
            </span>
            <input
              {...register("code", { required: true })}
              type="number"
              className="w-full h-10 bg-gray-100 outline-none px-2 rounded text-sm"
              placeholder="Enter Code"
              required
            />
          </div>

          {errorResult && (
            <div className="flex items-center gap-2 border-[#c92e2e] bg-red-600/10 w-full h-12 px-2">
              <div className="text-red-600">{iAlert}</div>
              <h1 className="rounded-none border-l-4  font-medium text-[#c9332e] flex-grow text-sm">
                Ticket Credentials Not Valid
              </h1>
            </div>
          )}
          <div className="mt-5 col-span-4">
            <Button
              type="submit"
              className="flex justify-center items-center gap-2 max-w-[180px] w-full h-10 shadow-none hover:shadow-none rounded bg-primary"
            >
              {isLoading && (
                <SpinnerCircularFixed
                  size={25}
                  thickness={150}
                  speed={450}
                  color="white"
                  secondaryColor="gray"
                />
              )}
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;