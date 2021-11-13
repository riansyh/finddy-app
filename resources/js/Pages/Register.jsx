import { React, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "./../components/Button";
import { Helmet } from "react-helmet";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AOS from "AOS";
import swal from "sweetalert2";
import Loading from "../components/Loading";

function Register({ user }) {
    useEffect(() => {
        AOS.init();
    }, []);

    const [values, setValues] = useState({
        username: "riansyh",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        Inertia.post("/register", formData, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                setIsLoading(false);
                swal.fire({
                    icon: "success",
                    title: "Selamat!",
                    text: "Akun kamu berhasil dibuat.",
                    confirmButtonColor: "#607EF5",
                });
            },
            onError: () => {
                setIsLoading(false);
                swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Terjadi kesalahan, mohon coba lagi",
                    confirmButtonColor: "#607EF5",
                });
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>Daftar Akun</title>
            </Helmet>

            {isLoading && <Loading message="Memproses pendaftaran akun..." />}

            <Navbar user={user} />
            <main>
                <div className="h-screen w-1/2 bg-blue-3 absolute hidden lg:block"></div>
                <div className="container-auto flex min-h-screen overflow-hidden">
                    <div className="flex-1 bg-blue-3 hidden lg:block">
                        <img
                            src="./img/illustration/girl-book.svg"
                            alt="girl-book-illustration"
                            className="absolute bottom-40 left-0 transform scale-150"
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-8">
                        <div
                            className="lg:w-3/5 w-9/12 max-w-xl"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="mb-7">
                                <h1 className="text-black-1 text-4xl font-bold">
                                    Buat Akun Baru
                                </h1>
                                <h2 className="text-black-2 text-base">
                                    Silahkan buat akun untuk menggunakan
                                    aplikasi Finddy
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label
                                    htmlFor="email"
                                    className="block text-xl"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Masukkan email kamu"
                                    required
                                />

                                <label
                                    htmlFor="password"
                                    className="block text-xl mt-4"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Masukkan password"
                                    required
                                />
                                <label
                                    htmlFor="passwordonfirm"
                                    className="block text-xl mt-4"
                                >
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    className="input mb-8"
                                    placeholder="Masukkan kembali password"
                                    required
                                />
                                <Button
                                    type="primary"
                                    isSubmit
                                    isFull
                                    isLoading={isLoading}
                                >
                                    Buat Akun
                                </Button>
                            </form>
                            <p className="text-center mt-4">
                                Sudah memiliki akun?{" "}
                                <Link
                                    href="/login"
                                    className="font-bold text-blue-3"
                                >
                                    Login Sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Register;