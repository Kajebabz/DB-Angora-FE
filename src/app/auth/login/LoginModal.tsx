// 'use client';

// import { CookieLogin } from '@/services/AuthLogin';
// import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter, Card, CardBody } from '@nextui-org/react';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { GiPadlock } from 'react-icons/gi';

// export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//     const router = useRouter();

//     const validateEmail = (email: string) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
//         return regex.test(email);
//     };

//     const validateFields = () => {
//         const newErrors: { email?: string; password?: string } = {};
//         if (!userName) {
//             newErrors.email = 'Email is required.';
//         } else if (!validateEmail(userName)) {
//             newErrors.email = 'Please enter a valid email address.';
//         }

//         if (!password) {
//             newErrors.password = 'Password is required.';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0; // No errors
//     };

//     const onSubmitHandler = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!validateFields()) {
//             return;
//         }

//         // const success = await CookieLogin(userName, password, false);
//         // if (success) {
//         //     onClose();
//         //     router.push('/rabbits/own');
//         // } else {
//         //     alert('Login failed. Please check your credentials.');
//         // }
//     };

//     return (
//         <Modal isOpen={isOpen} onClose={onClose} closeButton>
//             <ModalHeader className="w-2/5 mx-auto flex justify-center">
//                 <div className="flex flex-row items-center gap-3">
//                     <GiPadlock size={30} className="text-blue-700" />
//                     <h1 className="text-3xl font-semibold text-blue-700">Login</h1>
//                 </div>
//             </ModalHeader>
//             <ModalBody className="flex flex-col items-center w-full">
//                 <Card className="w-2/5 mx-auto">
//                     <CardBody>
//                         <form onSubmit={onSubmitHandler}>
//                             <div className="space-y-4">
//                                 <div>
//                                     <Input
//                                         value={userName}
//                                         onChange={(e) => setUserName(e.target.value)}
//                                         label="Email"
//                                         variant="bordered"
//                                         required
//                                         isInvalid={!!errors.email}
//                                     />
//                                     {errors.email && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <Input
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         label="Password"
//                                         variant="bordered"
//                                         type="password"
//                                         required
//                                         isInvalid={!!errors.password}
//                                     />
//                                     {errors.password && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//                                     )}
//                                 </div>
//                                 <Button
//                                     fullWidth
//                                     color="secondary"
//                                     type="submit"
//                                     disabled={!userName || !password || !!errors.email || !!errors.password}
//                                 >
//                                     Login
//                                 </Button>
//                             </div>
//                         </form>
//                     </CardBody>
//                 </Card>
//             </ModalBody>
//             <ModalFooter className="w-2/5 mx-auto">
//                 <Button color="danger" onClick={onClose}>
//                     Close
//                 </Button>
//             </ModalFooter>
//         </Modal>
//     );
// }


