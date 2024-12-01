// // hooks/useFilteredRabbits.ts
// export function useFilteredRabbits() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isLoading, setIsLoading] = useState(true);
//     const [rabbits, setRabbits] = useState<Rabbit_PreviewDTO[]>([]);

//     const initialFilters: ForSaleFilters = {
//         rightEarId: searchParams.get('rightEarId') || undefined,
//         race: searchParams.get('race') || undefined,
//         gender: searchParams.get('gender') || undefined,
//     };

//     const [filters, setFilters] = useState(initialFilters);

//     useEffect(() => {
//         const fetchRabbits = async () => {
//             setIsLoading(true);
//             try {
//                 const result = await GetRabbitsForSale(filters);
//                 setRabbits(result);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchRabbits();
//     }, [filters]);

//     const updateFilters = (newFilters: ForSaleFilters) => {
//         setFilters(newFilters);
//         const params = new URLSearchParams();
//         Object.entries(newFilters).forEach(([key, value]) => {
//             if (value) params.append(key, value);
//         });
//         router.replace(`/rabbits/for-sale${params.toString() ? `?${params}` : ''}`);
//     };

//     return { rabbits, isLoading, filters, updateFilters };
// }