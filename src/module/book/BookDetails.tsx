import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, User, Hash, Layers, Check, X, Loader } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { useGetSingleBookQuery } from '@/redux/api/baseApi'
import { toast } from 'react-toastify'



export function BookDetails() {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    console.log("bookId",bookId);

    const { data: bookData, isLoading, isError } = useGetSingleBookQuery(bookId!);

    console.log('book',bookData);

    const book = bookData?.data
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8" />
            </div>
        )
    }
    // Error state
    if (isError) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Error loading book details</p>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="mt-4"
                >
                    Retry
                </Button>
            </div>
        )
    }
    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }
    if (!book) {
        return (
            <div className="text-center py-8">
                <p>Book not found</p>
                <Button
                    onClick={handleBack}
                    variant="outline"
                    className="mt-4"
                >
                    Back to Collection
                </Button>
            </div>
        )
    }

    const handleBorrow = () => {
        toast.success('Book borrowed successfully!')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4 md:p-6"
        >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Book Cover & Basic Info */}
                <div className="md:flex">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <BookOpen className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                            <Badge
                                variant={book.available ? 'default' : 'destructive'}
                                className="flex items-center gap-1 mx-auto"
                            >
                                {book.available ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Available
                                    </>
                                ) : (
                                    <>
                                        <X className="h-4 w-4" />
                                        Unavailable
                                    </>
                                )}
                            </Badge>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {book.copies} {book.copies === 1 ? 'copy' : 'copies'} in stock
                            </p>
                        </div>
                    </motion.div>

                    {/* Detailed Info */}
                    <div className="p-6 md:p-8 md:w-2/3">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                        >
                            {book.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4"
                        >
                            <User className="h-5 w-5" />
                            <span className="text-lg">{book.author}</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Hash className="h-4 w-4" />
                                {book.genre}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Layers className="h-4 w-4" />
                                ISBN: {book.isbn}
                            </Badge>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                        >
                            {book.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Button
                                onClick={handleBorrow}
                                disabled={!book.available}
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all"
                                size="lg"
                            >
                                Borrow This Book
                            </Button>
                            <Button
                                onClick={handleBack}
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                size="lg"
                            >
                                Back to Collection
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Additional Metadata */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700"
                >
                    <div className="flex flex-wrap justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Book ID: {book._id}</span>
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}