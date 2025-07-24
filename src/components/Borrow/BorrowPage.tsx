import Borrowlist from "./Borrowlist";
import { useGetBorrowQuery } from "@/redux/api/baseApi";

export default function BorrowPage() {

  const { data, isLoading, isError } = useGetBorrowQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const borrowRecords = data?.data || [];
  console.log(borrowRecords)
  console.log(data.data)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Book Borrow Records</h1>
      {borrowRecords.length > 0 ? (
        <Borrowlist data={borrowRecords} /> // Pass all records at once
      ) : (
        <p className="text-muted-foreground">No borrow records found</p>
      )}
    </div>
  );
}