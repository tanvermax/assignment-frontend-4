import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  FormProvider, 
  useForm, 
  type FieldValues,
  type SubmitHandler
} from 'react-hook-form'
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { useState } from 'react'
import { useCreateBooksMutation } from '@/redux/api/baseApi'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const bookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  genre: z.string().min(2, "Genre must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isbn: z.string().min(10, "ISBN must be at least 10 characters").max(17, "ISBN too long"),
  copies: z.coerce.number().min(0, "Cannot have negative copies"),
  available: z.boolean()
})

export default function BookForm() {
  const [open, setOpen] = useState(false)
  const [createBooks, { isLoading }] = useCreateBooksMutation()

  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      isbn: "",
      copies: 1,
      available: true
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createBooks(data).unwrap()
      toast.success("Book added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      form.reset()
      setOpen(false)
    } catch {
      toast.error("Failed to add book. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/30"
            size="lg"
          >
            Add New Book +
          </Button>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[650px] rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Add New Book
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 p-1">
                {/* Row 1 - Title & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Title*</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter book title" 
                            disabled={isLoading}
                            className="focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Author*</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter author name" 
                            disabled={isLoading}
                            className="focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 2 - Genre & ISBN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Genre*</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Fiction, Science" 
                            disabled={isLoading}
                            className="focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">ISBN*</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="text" 
                            placeholder="e.g., 978-3-16-148410-0" 
                            disabled={isLoading}
                            className="focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field} 
                          placeholder="Enter book description..."
                          className="min-h-[120px] focus-visible:ring-blue-500"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Row 3 - Copies & Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Copies*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Number of copies"
                            disabled={isLoading}
                            className="focus-visible:ring-blue-500"
                            value={typeof field.value === "number" ? field.value : Number(field.value) || 0}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 block">Availability*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            defaultValue={field.value ? "true" : "false"}
                            className="flex gap-4"
                            disabled={isLoading}
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem 
                                  value="true" 
                                  className="text-blue-600 border-gray-300"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-gray-700">Available</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem 
                                  value="false" 
                                  className="text-blue-600 border-gray-300"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-gray-700">Unavailable</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="gap-3 pt-4">
                <DialogClose asChild>
                  <Button 
                    variant="outline" 
                    type="button"
                    disabled={isLoading}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Book"
                    )}
                  </Button>
                </motion.div>
              </DialogFooter>
            </form>
          </FormProvider>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}