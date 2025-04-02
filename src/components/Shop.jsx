import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = ["All", "Clothing", "Electronics", "Accessories", "Fitness", "Shoes", "Beauty", "Health", "Books", "Toys"];

// Sample Data (Replace with API Data)
const products = [
  {
        id: 1,
        name: "Smartphone Ultra X",
        fullName: "Smartphone Ultra X - 5G, 256GB, 12GB RAM",
        category: "Electronics",
        price: 999,
        stock: 25,
        rating: 4.8,
        description: "A high-end smartphone with a powerful processor, 5G connectivity, and an ultra-clear camera system.",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRvnqb7s-dUFNkScMzWX1RPlMCDYuAfvC8h-d9Rs2Ig8wQKeZzTZIQZhKsTIbhabxha0CkZlG_oUeEmUJA00DWclsbE8nv-Fo8l4tvaxkc6jcgPCOF9fLseoF7kfiiLFE-WY-lsng&usqp=CAc"
      },
      {
        id: 2,
        name: "Gaming Laptop X1 Pro",
        fullName: " Intel i9, RTX 4080, 32GB RAM",
        category: "Electronics",
        price: 1599,
        stock: 15,
        rating: 4.7,
        description: "A powerful gaming laptop with a high refresh rate display and top-tier GPU for an immersive experience.",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEhITEBAWEBIQFhYQFhgQFRAVFhYWFhUSExUYHTQgGBoxGxkWIz0nJiktLi4uFx8zODMsNygvLisBCgoKDg0OGxAQGy0lICYvLSsvLS0tLS0tLzUtLTAtLS0tLS0vLS4tLS0tLS0tKy0tLS0tKy0vLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBAUGBwj/xABFEAACAQIDBAYFCQcEAQUBAAABAgADEQQSIQUGMVETFCJBYZEWUnGBggcjMlRykpSh0RUzQlNiscEkorLwk3ODwuHxQ//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAA3EQEAAgEBAwoFAwMEAwAAAAAAAQIRAxIhMQQTQVFxgZGhsfAFImHR4TJSwSNC8RRicoIGFTT/2gAMAwEAAhEDEQA/APcYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJgY/XqX8xPMSdmepXbr1nXqX8xPvCNmeo269Z16l/MTzEbM9Rt16zr1L+Yn3hGzPUbdes69S/mJ94Rsz1G3XrTpYhHNlZWPHQgxMTCYtE8JXZCSAgICAgICAgICAgICAgICAgICAgIFrF/u3+yf7QNFs9L0k+zJtxRTgxNsbRFGhWqp2zTWoC2U1aVKpTAbJVysCNLi98oI7TLwNVl3Bu606r1yqIKrurmr0itTqZagbObEDO7KAQNFUDugRGPLV+iSlUZUY0qzZSrUKhI6InXtowubqDlBViQLgDKO3Nq08JTzudbaDh7z4S0R0qzM8IeMb378NiWKqSBw7JK+VolMRhyZ2rU9er/AORv1kYSr+1anr1f/I36xgV/a1T16n32/WMANrP69X77frGBX9rv61T77frGBnbIOLxlQ0cOlatUCGoQtS2VFIBYliABcganvEYG49GNr6Xw9bjb98ht46P/ANtNaaUWrE7URvxjf4oys1NhbVUEnDYnTkxa/sytLczXf80bvNLV7UfF4Xo+npYmiXBKipnTNY2IUnQnhw4XEi2jiImJznogb75Ndr1f2thaa1aoBq5XAqNlqDKwKst7ML8+V5Gtpc1ea5zg6H0lMkEBAQEBAQEBAQEBAs4v92/2T/aBzFbFVadDDKigLUBp9NnymhUJApWUoVOY3AzEC+Vf4hJtxREYNjbNOGJxNVurdJlDUbqUp1XYplSrc/NF2zLTBAVqzXvcBYStU8ZXxboFo1KKhswaqqVDhsRRzZlrqlXtoQSOKkEKQSGBULO3tvUsDTdmqJVxVgruEVLAFiqAD+EFjZSTbMSSSSTpTTmd8pis24PDN7N562JqMCxy3vqeIPC801abNsL83FXN3mKsqwggUgLwF4HU7BpqmzcTVem1dcRtDBYDo6ZKvVWnfE1aakAkEkUl0HG0RGZwOzxu61DFKidTp4evhy9XEU9nI1WrRw1TShhXAJz4prHX+EXZrDj6FdWNLM1nMRurnr6Zj6cfGCsdbM2nu7g8Pi6rjA0WVto4LZeHo1aZ6IB6VOpiK5XTpDluAx7xfWYTeb6ddOPrM9v+ITEZ3Q4TeLZVYVcRSoUm6nSxe0sVS7S5SlApSYqM18qimOOp4C8vp6u1fnbdER49Hv6LViFn5KVI2xg7gj54cRbuact9+9Fn1RM1CAgICAgICAgICAgWcX+7f7J/tAwdjuopUVzAMaeYC4zFQQCwHG1yNfERM5lFYxDQYZ8XjekDU1oi1bC1C46xhcQqsUqIaDOrqwYuAwurKGubFbEtVvXvpQwVJqFFs9QUwrVCb1KmRQmYt/E1gO0eWk0pXO9emlbU4cHiO19uPiHDsTkN1I5f9BE66WrGJ6J3S7q0iIiejg1FYaeKnKfZ3f585XV31z0xuUvScdiyGnLLltCWaQopngUzQKZoDNBh6vurjsFT2Zs9k2lQweLw9bFVnWtROI7dUlQej43CAAEX4mWpHGZjMJ2Z6GPtTbNB61Or+2VD0m6UjC4Cph1qnMGvVAZQ+th2r8TzM2xj5Zjhvnf7w2rpWziY4cWpO/FaiMQ9LF1arVsQ1cNWwlL5qqVKtVoFqzGmcpCiw0GlpTGK57lubmK5nsS2Vv2mHoUMM9OqaIwnRt0bItU1HxPT1Kq1rZ1ulxYNpmvxkWrisR17/t7+quppTWI+u/7ffvZu7e2TjN4cLXvUIeqjAViGamCnZp6C1gOHt1ubktT5aVr3z3/g1qbFa16eM9/Dyw+jJi5yAgICAgICAgICAgWsX+7f7J/tA0QwtOphqLO7UigDLUpsEen3MAxBFiLgi3fzAIhaYzOIcHv7v6MMgoYY2SxQEEktl0OZjqe7jqb3MjLpryeYiLdbyDaeNepWWu2quM1u7k6+d/cRLxqYnL0ubjT1K6kRunf/ABMevdLFGGsalLj/ABKedhdT71J845zdheOTYm+l3x3b48Y9QU75W7mGQ+BHA+VvIyedOZi2zaeExie2OE+nhLAcEEg6EGx8DIy8vU05rMxPFdpYdmF+C8Lnh7PEzSlNpWuhMxtTwXFVB3ZzzbQeX6zevNV4Rnt+ykzWODaY7Y1WibVsOyAoHD0wQCp7xcZT5XB0Nom+nbjXHZu/CYtWf1R4bvx5NXVwJALI2dRqe5l+0P0mN9PG+JzDT/TZibUnMecd32yxZkzrVnUaP0QeAHSN/gf8R7zLc5iIh6elybExE9EbU/xHpAaZyd5ao1/EgGw8zfyEjneK06WNPPTafKPvOfCEqmHzVFpX7K9knkBc1G/5GROpla/J4tq10Y4RumfO0+q2lPpa2osmrNb+FFFyPIW8onUzOZZbEa+vmeHGeyOjw3Q6X5MKhbbOEY8TXB8w0TbanMuDldpvabT0y+ppDkICAgICAgICAgICBbxKkowHEqRA8d3/ANuVkp18Mhs+GFLOo9VwLv7QWT70xvbZl6XJNDnq2mOjHpP28nmGCptiqWIRjeoqnEJfvKD5xR8Fz8AmNtTFnraOht6M16pj7fZHA4M1sPVUfTpfPL4roKg8srfCZE6mLNaaG3odk+q6cKTRpYheKOKTeHFqZ/Jh8IlOc4w6eYn+nqR7xP5ZD7HJepSUaOgr0vbqQo/3p7YjW4L25HiNSsdE5j33+DT7YwRXo6tuzUX/AHLYMPLKfinXpX2oeT8T5LNLxfriJXdnFVpB3TpEWuCy3tmBUaX9x/yDwnVThhw6n/zxH1/j8PXk3XTC4brez8HRr4hilQNiDcUVdQ2WmrvbRWGoOpY8rRWczvcUzETuhi7Q36xGHorT2hh6LCoxUihZxky8Go1Lq+o7mFwdCLTSd6s2mXlWFYOuLqZQoKXyr9Fc9RQFXw1/KVtwd3JJxF5+n8wwtm4M1aoW1xqzfZXU/p75hecQ15Fybn9aKeLeLsqoyooHzlepp9kEqD7L5j7hOK2rve9PJp5u1uucLiYIGpVqj91QQBfFvo0x7b9r4TM+d+VpPJca0R+2PSGJSwhTDVK54u3Qp7BZqh/4D3mXnU3xDkrobNL37vH/AAj1PosIap0as+Rf/TQgsfe2UfAZbnM2iGMaGxpWt0zu/luvkwwTjaOBr27Bxa0gebZGY29wHmJtp2zOHj8t0tnTi3XL6emzzSAgICAgICAgICAgIHgu9LhNubZqP+5WgBUB0zh8JRRE9pcr7LX7py8o4x3vd+DTGxqZ66+sz6RPp0uN3Ka2MpvfKiE1HJ4CmgLPfn2QdO+8xvHB6fJZiYv2T57o88MrdSqnW3q2y0FWrUdT2h0WVs1M343By/FKWjfDq0rRNdTHd253T3ce5c2NVVcJjWf6DKlNRwvULhkt7ArH3W75TG+XRtRNKzH7pnuxj+Y9eht8M4vs5LgVVD1C3qUyRlB96ufikV/tdEzG1qZ6o9N/jujuarejFUThGygDPi2ekOGRBmv+TKP/AMndyfh3y8v4vMRpVi3HEOZ2Y4ZK1I/xKGH2kv8A4LTvo+d0/mravf4fjL2PZG1sRtPZeampo16ZK5rAUnZQoJC5r5eJuB2SLa8CiMS5IhxNGvi6eJqbMdKWJr161IPUb5wFdCVcEXygC+lrZLjmdJVaPbppUxiBRUpTq4lujVgUZaVK4AYEk3zEDU3JQk24Ctow7KRsaOZ6Z9P8+Sm6FRP9Sp0qGldTzAPaUfkfhnPqR8svX+B3rGrMTxl2KYmkcRQZbBamENOjr+7fJly+JuGT2m88y36u57ecaUZ/dv8Arvz+fJpc4OBroujpiQ9TmystkPsBD/fmURuha9v6l4+k+uZ8Yx4MbbtRXwmCZNKYptSIvfLUVyXv7cyt8QHdNIj5nHe0Toz2+WIiPSY8+lb3ocPRwVRNKXVlpgD+F0JFUHxL3b4xL0j5mHKLROju65/jHlu7nRbj1FetsMpoExlam47+lYZw59qZR/7Zm+jE7U+/f4eR8TvWdCsR1x6T6Tmf+z6GnU8IgICAgICAgICAgICB85/KSHqbY2jhk41a+FJtxYrhqYVfZdifKbaPJq60zNpxh0afK7aNJrWOMtVgt2sbTSogoupqqEZjoUXMCQ1uFyBx7gfGbTyDk8znblpT4rq0pNYrG9rsLSy0qlMEgVMuY9+UG+X2Xyn4ROj/ANLpzOdqfJEfG9WtJpFYZvVAadOmWIRWLnxJtqfYB/eRf4JpRW1tqfJFP/ItWb0pNYiInHT18WuO0mbpag0NT5pByW1v+At8U8CNHg+njldrVtbP6pxHq1m1sWXcLfsovRj3asfvE+606dOmzDyviHKZ1NWYzujd4MSjWKkMNCDedEPOrqzS2YdNu/vI2Cd6tJEqU6qZKtKoA2ZcrjomJB+bzNfTjYC4m+zmNqFr4ztV4T5MrE70oUqJhsJQwKPTFOpUpLeqQVtVph2uchNxYWNrXPGWiN2Z4K6ddr6R1uUxmKztyUAKo9VRwH9z7SZhM5nK+trRecRwjdHv1+qODxRp1Fcdx18RwI94uPfMrRlfk2vOlqReOhuXxbZSoY3pt0yEeqbaj35T8RnJbS3voLa87N6RP+6Oz3hMY/57Pwp10KtyGbj5OP8AbKczuwieV/1a3zutH4nzY2GxDZK+Gbj+8UHudL5h71v90S86fCXNTVtm+jPHf5fhDC4ovh6tA8VPTp7haoB8Nj8EmdPfljpa8307aff4cfLe3XyW1j+1cEl9OsK1vEKwB/M+c0rXE5eXynVm1Ir9cvqeaOIgICAgICAgICAgICB84/KEH/b+O6PN0nSYcJkvmzHD0AMttb3no/D4idva4Yhlq9C2lLaRJTNVOgc/OgrqxAOfNlvmB0ve4PjPSiNDju8GEzZj/smuENQ02y634ZhZzTa9O+YdsFeHETfnaROM7/c8eDKYlcx2Bq0k+cQrdWHEHUDVTY6MNLg6i4vJ5yt6Tsz0OfZmLxnrcU1bLqP/AOa2H2z3+dvuz5rm9mOx9lblGxOY/tjd2z78muzTN5k2UzS0K5SSoQbg2MtW01nMEWmOCtSuzcT+g90m+ra/6pTN5lbzSiuTNKytFmfhsRorH+HsN9k3/wAX8hNIrExl6GjyndWZ6N09k/j0hV/ouh/hOYew6N/8T7zJnS4x1JtbOnbTnonMd/H+PMrVzmp1h9LQn7a8b+3Q/FKzTdFjU152q68centj78e9F6nRVQ66rcOBzVtcp9xI84tTZn6KX1OZ14vThxjsno8N0uo+TSmF21gwDdenUg81IJU+VpXUpszhzcrrFbzEcOjsnh5PqiUcpAQEBAQEBAQEBAQED5234xDUt4MfUWxKvQNjwP8Ap6QINvC4np/DaRfbieqGOtOIhrkxNEI1LofmiUfL0hzZ1DgNny2tldhbLwtrfWexs2idra39jjmejDLfeStfNZA3EEKAQ3TmuLNbNlv2cpNiPHWZcxXGPfDHYbUm0tqNWpgWyqL1LXBGYjS1lGgF+NzrqTL10opWZ+jGdSZvHa8zuTcX77+/n+Znzm+Yw96Zmdy2ZRSSEEgIHpm4CoMAzsge1WofohjYBec+X+LTaeVxWJxmI6XJq/qZVfaTBlyUKLIalNW7JzIHIGa9rH8uIHO1ackrsztXtE4mY37px797iKx0yjvfgqTvgqbFaKPiRTd7ABFYqC57tASddJv8DvabXzM8IW0ZnMrI3OwgCs9dkBqFXHTU2bDoMOlUCoRR1bMzJoBwFg2s+izLozKOzd08BVCM2KNOmwVldqtILUzg5gvYzKUIVGLJqWvZBGTMrabp4YhvnKjZcKayN0lBBXcdDekiAM6FTUdSCDcp9JdbMmZXNwl/1ew20v1nEDxOq2905dLM6+rmeGx6SrGZme59JzpSQEBAQEBAQEBAQEBA+dN/q6LtvaedlUZ6Fs5C3/09Lheet8L1K12tqYjhxcnLItMRsxLUDG0P5tL76/rPV5/S/dHjDg5vU/bPhJ1yh/MpffX9Y5/R/dHjCea1f2z4SpXxuD6vUW98ST2WD9lRnN9M1iMlhw4nwvOO+rM3nFo2e2Op010p2Y+Wc9kuNSne08qKvYiFK1G2speuEXrhYtMmeC0GFLQYek7h1gMDlFRKb9M57RHIdx8bT5j4rTPKszWZjEcHJqx8zaVMIjMGL4VmBDAsFNmB4jkeGvt92Fda0Rs1rfHepntYe8+OSm2z6rlawpYpKtRUKnpFRkZhY6agEWOms7vg2naupqTszEbsZj6tNGJzLDqb5UWYE4cdH0vSNSC0stRerCm1FnIvlarmYta9mJAzcPfxLow5faWISpXrVFvleq7jOFVgGYkAheyLA20000twjEoYxy+H5RgdtuG4OM2HYgkYnE3AN7XZLXnJpVn/AFGrP/D0lWP1T3PpSdSxAQEBAQEBAQEBAQED5++VvdrEptDEYsqho16idHZhmOSjTVrr3C6mWrWbcF6RE8XNUd1KzKrdPgVuoaz4qmrLfWzL3HwlZRPHcn6H1/rGz/xdOMoPRCt9Y2f+LpwKeiNb6xs/8XTgPRCt9Y2f+LpxkPRGt9Y2f+LpyBlbP3eNO5dtm172tnxiLlAzX4Dibj7vjAY3dp6mXI2zqNhrlxqNm0Ud404E/EfCBjeiFb6xs/8AF05OUnofW+sbP/F04yZBuhW+sbP/ABdOMivohW+sYD8XThCvohW+sYD8XTjIpU3SrAE9PgTYE2GKpkm3cBzhMN58me62LfH4euEVUoVUqVMzqGykMLqo+lrL3pNeK16xXg+hpRmQEBAQEBAQEBAQEDS7y7x0sEna7dUjsUwdT/U3qr4+UD583r2tVq4qpXdyzvxvqEA4IgP0VHKX07zXgi1ctLlAAuxBPNdAe8E2v+UrMTxlbGF2jQLsEVjcrmAyEkj+kAa9/G0Vra04pGZRmIjMzhKtg3Rsr5kY/RUp2n4cB75a2jen6owiL1nMxMLdK1vpktrdVW1rXvrbwlIrMpjMzuhcLU7AhyRxPEFeHPjGDIxp3PbJGguASLkXANxcd8gicihCAc7DXiQcp9hAv+USdKpyDizqLX1Gp9g/+5OE7utUhRcFmDXACkHMb8L6WHn3yERaJUBThma/eNdLce7jGJMrdQrfsuStrk5b284Mo6WJ6QX5ZT+fZ0lsR1p3dYBoDnv3HsjTlbnIxOMmJxlcGHDAqahBZbrZAQ4PC7XuvlJrFZjMzju/KuffuG12BteuMVSq9IyVKbXXLZb6jMrWGqm1iO+X1dWb4yUrh7/uzvLSxi20SsBdk5/1JzH9vInLK0xhvZKCAgICAgICAgIHL7273JhAaVK1TE24cVpX738fDzt3xMpiHlONxFSq7VKjF3Y3LMdTIS47axIqE20/qHE+cnESje14qsCCAo1vwBHvBGvs4SNmETvjDZ19u12RL1Qzhs1jSpqKeW9rECzce8SvN1xMY85hnpacad9qsb47/KUKu38UxVi6s63IJp0xluLEAZbflKV0NOucR5z93Rq3nVrs34cer0Y2O2nWrsjVCGdb2IVVvc31AFppWsV4MK6daxiIYwdhYgAEAi/G9+83llsKMx7lC9kKbG9+ba9/sk5TGYSR2BNlABtcDXh4nWQb02qE6EBVvewF+7z/ADkxKMIW4C9x7OGtzpfXvg3i+Pjr/wB8Tf3SYwmIUHiL6d/t8OEie03r7FQFIa54FAlstv6ze8pgibZwliHpg3pkhWXtKSTlvxB0Fx3zXYpGN+e6dy1oxEYtnuwVqgsqKxZfpEsO83uFFrqOF9Tc6yLYiflnPkyrXpnczNnVC1RSdbAC4XU24FjfU+MrNpni0isRwdjhK1SmyujZHU3DKbEHmJVd6junvcuJtRrWTEcB3LW8V5N4e8chaJUmHVSUEBAQEBAQEDhd8N9hTzYfCsDU1V6o1FPmqc28eA8TwiZTEPN3qEkkkkkkknUkniSe8yErTvA57a+pkoahoEbwKXgTpjvkoTtAWgIAwKWgLQIuIELyEl4ElgbfY+hgh0tN5VddV+/36aWPMQPRN0N9Q2XD4prNoqVToG5LU5Hx7+/XjaJVmHdyVSAgICAgeX79b9gvVwdF+iCM1Oqx7DsRoUXvVfHv7tOMSlwXXqXrr5yMJyicbT9dfOTgW3xlP1184Q1OOcNwIPvga1qZ5QLZpNygOhblCEgrcpIrZuUBZuUBlblAWblAWblAWblAoVblAh0TcpAr0TcoSmtI8oGywDheJAgbinjafrr5yE5XBj6Xrr5wnKQx9L1184wZh3W42/gV6WDqv0quy0qTDtujE2VDbUr493s4TCJw9SkqkBAQKMbQPO9+9y6GOrdYu9KrlCsadrVbfRLAj6QGl+VuQgcNiPk+cHsu59oEDGbcOtzPlAgdxq3M+UCnoPW5nygU9B63M+UB6EV+Z8oD0Ir8z5QKehFfmfKA9CK/M+UB6EV+Z8oD0Ir8z5QHoRX5nygPQivzPlAehFfmfKBX0Ircz5QHoRX5nygPQivzPlAehFbmfKA9B63M+UCvoPW5nygSXcatzPlAyKO4Lk9pmt4AQO13E3PoYKv1jt1auUqpqWtTvozKAPpW0vyJ5wPSka4gSgICBS0CJpKe6BHq6eqIFOrJ6ogROCp+qIFOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VEB1Gn6ogOo0/VECowVP1RAkMKnqiBJaKjuECYECsBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQP/2Q=="
      },
      {
        id: 3,
        name: "4K Smart TV Pro",
        fullName: "4K Smart TV Pro - 65-inch OLED, Dolby Vision, AI Processing",
        category: "Electronics",
        price: 1299,
        stock: 10,
        rating: 4.6,
        description: "A premium 65-inch OLED Smart TV with stunning 4K resolution, AI-powered upscaling, and Dolby Atmos sound.",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEBAQERIQEBAVFQ8VFRAQEA8RFREWFhcRFhUYIDQsGBolHRYVITEiJTUrLi4uFx8zODMtNyguLi4BCgoKDg0OGxAQGy0lHiYvLS0tLS4vLy0tLS0tLS0tLS8tLS0uLSstLS0tLS0tKy0tLS0tKy0tLS0rLS0tLS0vLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUBAgMGBwj/xABMEAABAwICBQYFEAgGAwAAAAABAAIDBBESIQUGEzFBByJRVGFxMoGSsdIUFRcjU2Jyc3SRk6GjssHRFiQlQkNSwvAzNYKDorNEY2T/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EAD8RAAIBAgMDCAcGBgIDAQAAAAABAgMRBCExElFhBUFxgZGh0fATFCIyscHhBiNCUnKSFSQzU2LxotKCssI0/9oADAMBAAIRAxEAPwD7igCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCA8ZrTyiQUNSaaSCeRwYx+Jmyw2dfLnOGeSsUsNOpHaViGpXjTdmVI5YqXqtV9j6a2eEmtxF67T4mfZhpeq1X2PprV4afAx67S4mw5X6Xq1V9h6ax6vIevUuJn2XaXq1V9j6a19DIx6/S4g8rtL1aq+x9NY9Gx6/S4mnsw0vVav7D009Ezf1ynxMezDS9VqvsfTW3oHvHrlPiPZipeq1X2PprPq8h65T4j2YaXqtV9j6S3WDqPcY9dp8TPswU3Van7H0lKuTqr513+Bj16lxM+y9TdVqfsfSUi5KrPnXf4GPX6XEey9TdVqfsvSUi5FxD549r8B6/S4mzOVunJsKSqP0XpLP8ExC/FHtfgPX6XEs6PX5sng0k4+E6IW+Y5KCpyZUp+9KPa/AljiYy0T89ZzreUmmj/dL3fyRuDyPHa31rSHJ1eXNZb3l9e43daC1MaP5RGznDDQVkh96I3W7yDl41tPk6pBXlKK634ELxtO9s77krvsWZ6Wkrp3i5pHRdkkkd/8AhdU5wUdJJ9F/mkTQqOX4Wum3jfuJG0m9yj+kPoKMlG0m9yj+kd6CAztJfco/pD6CAh1ekpo8/Ucjx0sex31b/qUsKSn+JLpv4EM62wr7L6reJWt1wbfCYHtN8w4gEd4srP8AD6lrpp9f0OXU5dw9N2nGS6l4ljDprEW4WBwc5rS5rwcOJwFyCAeKryoSj72RZo8qUK8kqV5X3Wy6Ve67C2UJ0QgCAIAgPhHLC39qH5PD/Uupgn92+n5I5eOftroPFAKaTKLYUTZg2CjbMG4KikzBso2zBycFLAkTNbKVIztANU0ImHI2AV2nTNbm1lchTBi6tQpglUdGXlSOSiZjFy0LcTRQZWxv/lG4H3zvwCrSlKfQWLQp6msbqmseImBzsRyiYLNHaQPOVDKVOmnLvZDLFyb2YLqPdaN1Mo6JjZdJzMLyLinBJHdhbnIe7LvXGrcoTqS2aK6/OS6+4v0cDOedV9S+b+S7WdK7lOp4RsqSnaA3IAiwH+1HuHeQqroN+3Vl8+95fE6MKUKa2Yq3cedfyj19QTsGuNjmI2ty+ja9w8dltsUIq9m1vd7dvsrvNnKKdm1fv+fwI8usdcc5akRX4SSyRn5pHs8yhliKCdkl3P5s3g9rRPsf/U5N1invlpCmv0CaNx+qoK1lWo/l7l9DZS3L4+BZ0mtGkG+A8SgdG2At8LCR9a1SoT0aXng38DV1UtY+etIuKHlIlb/jwOw+6NtIzym3W8sHUSvHPv8ABmFOlLnt05d+neekpNYaCtaA/BfgTk4dzuCihVqUnll53FfFcn0a8fvIp8eftOnrHspI5In449rF0YmjG351cli1UptS1PMw5BnhcbTrUneCee9eJ6hUD1YQBAEAQHw3ldbfSR+Ih/qXRwr+7fT4HH5Qdqi6PmzxJYpGyjc1IUbZujCjbBkFRSZhmy1WbDRkhWoRsjFwGqZIxcWVulAXC6FOBlGjnK3GNjaxIooC4reclFGYw2nYkVFfb2uI2G4vG89g7FSnVWsieUlTVlqWeqmrctbJhjGFjc5Jj4Ebe3pPYqlfFqEdqenMt5UjTqVp7Edfh0+cz2GldY4dHw7DRrBiPNdWENJlfu5hPhZ8cx0Nde641Sc60k6nVFeGvz4o71DDUsNHe+d+L0S85ngtIzvc8msmeZXWJp2h0tUfjGlw2Ysf4rmkcIytXXSWzBabrZdMs4rqUnvaJXKT4ee1/wDFbrnBjHkDBFDA3LOQNq5sux7RG09rWA9qryr532s/8f8As7y7LLgbqi5a6cfBZdtzeamEgtPNPUW/dkke5g7mXsO4BQOpG91FX3vN9rJlTsrX7Ml3G0VJA3wYYx2hov8AOsqvPeYdOG42cyM5FjD2FoPnW8as95pKEdxFloYD/BiFuLWhh6d7bG6lU29bPpSZjZRP0foeeeZkkTqo4Nm0APc5uG+TRiPG2ZNxvUyoKS2mklwy7PoQyqbD2VLN8G+21sunouerq9WpommWSDO1y5o2E7Dx3Esl7hn71bSW2tlO/B2/9la3Wl0mKdWVN55cVe37Xn2bR21U1klbURUznOcyWWIA29+DZw4d4y7lWnRazXWnqvEttxnG7yfDR+B9eUREEAQBAEB8V5V2/tE/ERf1K9hn7D6Th8pu1VdHzZ4/ZLZs522cX061ZJGZyMJWjJNo1EJWmzcXOgjUkIWNHIFqsJC4sp4RuLmCujSgZRye5X4RJEcm5mylbsje2RYVrzHHgbvcOc7oB4eNcjE4lXLdOGzHiWWpWqslc8knZ08ectQcmtAzIF95t83Fc+piLLbn1Lf9PKNFQdWWzH/Xnce61g0xBTQCkp2hsQaXCIu2e1aLB1RUv/civbtcSBYkhq5tStJy25PPujuy53uX+11KVKNKOzD6t+dXolwPmVVpqSV5dE9w4Grts5XNtbBTs/8AHi7Rz3DeQDhEM5pKz59d7/U93+Ky331JoUnOz/0uje+L6kjlSNawYWANH95qvOo5aluNNR6SRtVpcM0dKsmjNDMt0jRmNut0jRnKevEbHSOAdgbcNO5zybNB7Lm5HQCpU7Gh7HVGslp4MEla8GZwlkbiwBkjmgFoeNwADWk7sQc1o5pKljOnBbU1dm/o6kk1G19+4t63XCVkTgyUTR5se1zhMHXG7ERdptu33WqactqKt8u290YpUGlapK76l8DzercpOk6XnGxqoy3jvdmOw7/GpZy2otPVCpFpprRn6EVU0CAIAgCA+N8qbf2gfiYv6lcoe51nA5Wdqq6PmzyWBbM5VzUtWDZM1LVqbKRqWojdSOTmqaKM3NC1TRRm5qVcpRMo5vK6VKJIkRpXK2lYliiXoCn2kzW9qpYqtsxZIl7SR9Uj1MhkawSkBoIc47i4rzNSveV2dGNNtWIetGtcMETaekY3ZNdgijHNbUSjMyOPuTLXJ7L9Cr1JuK25vN6cFv8ABFynS2fYiunw8WfKNIaRdO44nl7HPDnPORqZBkJHDgxtyGM4A33kqt7ub15luvzv/J8+7RZFmNPay5vj0cPjq+CORRSZY0yJDZVoYNtolzRmpkW6NGZbUYQ4WacYAuWhxbmDdpPgnLeOF1NFmjI7pVukaM0BDjhf4BxhxtcNDo3x47e9x4uzDfgpoQu7WuQVL7L2dT6Dqhq/FV08hqMe2ObA27rcQABvGEtd3OUeMw1T0tNQkkrZrfxXSR1OUPR4eXoouTu87N57stx5DS+hZaeR5wSMa5pHOaWtNhvGK17HiutToRsotqyzb4fU1pVpKClP3nouP05ydqvVtOlaNjRn6riv0jMkC3Dm4HH4yxzaVzIRylLzzF2cro/SiiIwgCAIAgPkXKay9efiYv6lboe4ec5Ydqy6PmzymzWzORtGhjWGbbRoY1pcypHNzVvEkTOTmqdG6ZoQp4I2TOL10KUSSJHkK6NNEyI0q3nLZRLEm6GrNi8PK81jcRd2JqavK5I1h14nl9rY4sYcjnYkHf3ZfUCubCKectDsUlaNzzsta6TeTzmhvxcAOTB2uOZ7LDiqs57UnN6c3T4L4lunTdtnnevBeL+Bs1V3NsubCSsjN1i5G0Z21lkjbNDVLKRG2T9H1kTBjkZtXiRlmElrcAuXYsucDkLdh8c0LLUjlciyTXJNgLkmwvYdg7FukYZyLlMkasyyRzSHNNi03B6CpoKzuiKSTVnoWsWnmtb4NhY+1XcxrSTe0UjQSxmZOAggE5Hgp82rfFXXStz32vfgQUaXom3F69Te6/M7b3nbW5A0zptkrcDdtYlt7yulvbhZzBa/vi8e96NZQqTym/PciRRSltJZ7/NzryfTF2mKInrUfbxSpFRp2RJdvU/WK55kIAgCAID5XyiMvXH4qP8AFWqPunl+W5Wrr9K+LPMGJZOKpHMxIzdSMbHttfib2HbkoyVO5O0jqxLFG+WR8QiaI8Egc4tqS8XAhy5xtvvay3hNXsXpYOdOLlJq3M999xHGrj9s2F8sTC6Bkwd7a+7XAENDWtJL89wHA5qZVFa5JHCy29htaX5/Nzao1SmbMIscQaYHT7d2NkbYG5Oe4ObiaQbC1r5hT060bX42txJfUpqezdWte/AjO1VldJAyGWCZtW6RsczXPEYdGLvD8TQWkDPdmNyv08TCMZOSa2dV07jdYWV47LTT5zMepTniNzK2hcKh7mQnFUDbSN8Jg9ry4ZnpCs+vqN04SyzemS7SdYR5e0syiqNCSMpxUOLA11RJBguS9skYBdfK1s+BUeLxcbuC3X7SOVOUYbT6DpXaBfHFE4vjMlS2N0VK0TGaRsj8DcJwYS4m3NDr5jjkvN1Km1JlmjSatd6lJpPVutijMktFVMYMBe90UjWjGcm3I4nC3sJsbLSrL2dmJ2IbN1fQlQarVgfsTSVG2czaFmzdiLcQaX2/lBIB6ONlSqXctlLJHRobKhtyau9fA61+r81OYRUt2LamNr2yOEhY1ptfEGtJu27bgAkXG9RSTVrkqlGV9nOxLqtV3MLmNqKaV7KX1SWM9UgmHZskBBkjALix+K2+zXXsclnZa5yJyTztz25vEjP0CGi0rw2SSnp547OdhjbLIGhsowHnEOYQARYOF+zeKVs9eYrzvfJZZkc6tv53PaDG3E5pZO14GEuthLLk4Wl1hnYXtZbRiyJs4Vuh3xFwc9pcwOOHDM3EGkB+FzmAOsTnn08clMkaXucKaikfhLcNnvcwXexubWhzrgnIAEZ7uG9SxRhs4AqVIwzBKmiiNnCUqzGJoRi26k2Qeg5OmW0tRfKovOoa6+7ZlH6xXKNwgCAIAgPmOvrb1p+Lj8xVml7p5Ll92xEf0r4s88WLa5wlI5mNYZIpGDGOIJHEDI27DwWhLGW8sNK6dEsLqd1O1sTQzYNa6zqYtGZxW9sxcb2v3reELO50549VIOnsezls56eN+c5s1oLZC8wuwupYYHBkropbR2s9srRdt7Zix6FIqV+cnjyh7V9nmS1s8uJwqdbi6UOMGKEUr6Z0LpXvkkiebuJmIviuBnbKytU8N7Oud73+hL6/eV9nK1rX+ZHh1rbDJTOgpcEVG6Z4hMrnulklYWlzpC3KwtYAK/DBOcZKUs5WztpbgSQxai47MbJXyvvK3R+sZhZRs2OL1DUSS3x4dtjLTh8Hm2w789+5XauE23Ulf3klppY2hibKKtozSp0ttacU+zw2qpqjHiv/AIgAwWtwtv49C4WPWxK9+ZLsI6uI2o7Nue5iTWsUsEcbYXODKmkmIfO50WKnmExMUeH2lz8Ni67siclyIe0dLAPajYr9D60F5ZAaZrwaarhdd5wubLXNq3OIA3A+12477jcoq1X0alLcdjD4f0sox3vuSPS6Q1hc4FsVOIRsJ4mhr2+1iWoim5obG0AN2WEC2477jOh65+VWO1/D/wAzvmn2Jrfz3uUelJBM2AbLA+CnZAX48QlZH4Bw25hAJvmb34LSddSSMrD7F+Lv0Hf10cKqKqEYBhZTswE3EjIoGwuaTbIPaHA9GI71t6f2lIqyopRcd9/PUcKrSJkqZKh7M5XNOAOwhgZIx0bAbHJojY3duC3VX2torThaOydJ9OSOxXM93va95E0bdo9otd1os7iwI3Gwup1Wb8/QrOCRFrdI7RuB7ZLc4E44ybPLQ45Ri5DW4Rnl2qaMyJqxnSM8DGxvbR05ErjIYyZGyYAHMw3wANBNjzMrgd6spGE78556ula92JkQiGEDA1xcLje4E55+NSxBEcVYias4vKsxI7GWMyW5gveT8ftai+VxedR1191Iyj9WrjG4QBAEAQHzbXdt6x3wI/uqxS908d9oX/Mx/SviyhLFscG5rgWrNlIw9i1RIpEKViniSxkcYQ0Pu+1rP3jELlhwkjjnZSq70LuHlFT9rT6GJfUpuWtkGTrAnE4Ek2Ftw377nIDK5JFumqhf2sPqrmKmCka4gh5AcM2u5tjEObfP9/jn4wr9F1mrrzn4Eilh1K3nTxK8upsRBa4t2BA3hxl2pcCT/NhsCd172ysrMlW2b3zv3W8eskUqPVbvJVOKdpe2znAPYGPtc4GkYyfhAG2+31rzPKDk85EMp0U2uOXz7eYptNmg2jWyCZzQbkNuLtLA2+/IY/Hu4XVClfZbR3MCo+jvDQk6l00D59qxjsMdJGHxnO0020kNid4BwgXubLl8oVYwgr87fcrfFo9JyZTbqN3zUV3u/wAEz2R0fAQTgeDa4ANwDa+Ek9txfosd91yfTUuPnz2cTuN1dLrz5v08DnLo6nueZJbO2edsuzfv7O3cVNGtRb5yvONW17ogvooLuDmltzEA5odzcg17s943mx32CsQnTd+r6nPrKaz6foQ2QwYSHMtziQTiLgedhBcD4Obb2z5pte/NmhKns5rM59WUrm0VLS+FZ9m4DZxF3DiLDe6/Rlh6CpIygVZTZXVlIwuAhDyDYBpu55PDhvPQL53tlZSqSvkQuZW1EB3G+XA3y7PqViEyN1LFdPSq3CRtGrcrqiM/3krcDfaTJmmqCKJ7WROkddjS7GIwQ4gHLASLbxbeLKSjNy1FlzEZrRZWDDRb6g/5tRfK4vOta/8ASkYR+qlxDcIAgCAID53riP1x/wAGP7oVil7p4v7Rv+Zj+lfGRSliyeeTNMCwza5q9q1RsmQ5WKWLJ4SIVQxTw1LVORWkZro0y0ZkGS6NNmIvMrpBmrEvdLkXkTIRkvK8pLUry1PNadHtp+A37zj+C5sP6T88x6jk3+gun5nuuTGiBFSQN0kDfE2AW868vy1V2VTX6n3npsFLYlLoj8D3YoOxcD1gvenMO0d2IsUPTkCq0X2K5SxaKNeqU9To63BX6eIucevVsQZac/vFxzPEuIuRcgE5mwHzALoRxDqySnLLzuKLrrRkWSEcASbtN9wba56MzcN3K0rU7NSz5rfM0lUildPMivpLAZWG4dGQGXmUkZN5sjdRvMg1MA7fHln2K9TZG525yE12Al7XOa9rTgLd+I2ac+Awl2fZ2q9BXViWliFvKOSK25XootwqJnES8FvYkuX2oP8Am1F8ri86ir/0pA/Va4psEAQBAEB8+1tH62/uZ9wKxS908T9pP/1R/SvjIpy1ZPOXNcKwza5h7VGjKZElYpUyeLINQxTQZZpyKmUZro0mXloYccl0aTC1K6bereqLkNCVAcl5zlGF0yCepT6XhvJfpA85H4rjRXsNedD0PJk/uHwfzR77keIcKlvT6jkHdJTj8Wrxv2l9mNKXGa70/mehpTaqO/PGL7rH0xtOF5F1WTOozfYha+kZrtsi1dPzSQ0uIBIaLXcQNwubX71cwz25xjKVk2s93HqK9absU89HiaHFpaSAS02xNJHgm2Vx2K+p7M3GLuk9d/E42JqWuUdRSWJXTozkzhVMTZlfUQAdH593SurRTkro2p1nNNrmzZBlpxe9hfz/AN2HzLo0m2knoTQxF7J6ECdlgd+bSCGnCDxAzvliDfEuhSjuLNOrG7TyT6yiqmZrp04lZSzK2diuQRchMrahik2S/TndF3yeu/a1F8ri86rYlWpSJj9XrhmwQBAEAQHz/Wsfrb+5n3GqzS908P8AaV/zUf0r4yKotWTzlzWy1kZuHNUITI0rFumTRkQahimg8yzTZTVTc10KUjo03dEZzl0KUiVIr6hy6EM0WoI608mS5mNp3RpUjmcNItvY+L8fwXClTsdHk6Xszgtx6nklqcFW1hIAqKV8dv8A2U0twPo5GleO+0mH2sJJr8ElLqa2X/ySPSRnf0c76px/+l3M+vr5+WjNlJGlJmLmr2qzToSIKrRBqWK9ToyONiSir6d5eC0swfvAgl1rHwSD023ru4XY9G1KLcsrPdvOBXVNQnePtcz3FZVwWXVoU2zi+l2WVFWLLrUaJbhWKioculTpF2nXZUVjbq9CJYjO7KuYKZItwZXVDVKi/SZZ8nv+bUXyuL7yr4tfdSLaP1gvPkgQBAEAQHgtaB+tv/0f9bVZpe6eF+0z/m4/pXxkVeFZPN3MYVrIzcyWqFsXOEjFlMkiyFURqSLLEJFNWRq7TkdKjIqpgr1OZciQKhdWjItUzhFNbJMRT2kSyhdG07sTSPmXFrUfZZth5eiqqRK1YrzE7bNvipZWVOEb3RgbOob443B3dEVwuUsJGqtl+7UTi+G1o+qaXaehpN+ilTWsc1/452643XUfoSB7XtD2kFr2hzXDcWkXBC+WeqyhNwkrNOz6UXY1FKKktGdQFbp4e5pKdjV66VLClSrVIkzVdp4Q5ledytqwAupQwfA89jKiSbKWYXBXWp4ax5p1W2U9bAulRo2LtCVyiqo1dVI6NORS1alUC/SKipK2sdCmitqHrdI6NOJa8np/a1F8ri+8q+L/AKMiyj9YLzpIEAQBAEB4LWhwFW+5A8D/AK2qzSaUc2eL+0WEr1cUpU4SktlZpN873FdjHSFlyR5/+HYz+zP9r8ACOkLSTRn+HYz+1P8Aa/AziHSFCzP8Oxf9qf7X4HKS3SEMrk/F/wBqf7X4EaVqymTRwOK/tT/a/AqqynPAE+JWadRF2lhMStacv2vwKeopH/yP8kq1CtFPUvww9f8AJLsZXT0Unucnku/JdKjiqa1ku1FqFCqvwvsZVy0UwOUMvkP/ACV94qg178e1F2NGbWaZhkE3uM30b/yVOpVov8a7UHh5bjamZPDK2ZkL3FjgcBY+zwbhzCLeC5pc09jiuViI0qlKVNtb1mtHqunnXFF/DynGz0a8pn13k/04yOE0sr8DIcLoHykMLqaQYmRuLv4kebCPeg7ivGcp8nyqVFWirt5St+Zfi6JKz4O6Jttwk4pZPNcL6rqem9aHq/Xqm6zB9LH+agpYGa1i+w0lOW41dpin6xB9JH+a6dLCPnRTqOo9E+w4y6Xp+sQH/cj/ADV+nhkUKyq2yi+xlPWaTicbCWO3w2/munRpU4rNrtPMY6ji6krRpTt+l+BFdVRW/wASPym/mrK9HvXac9cn4u/9Kf7X4FfUzMO57D/qCnhKn+ZdqOjQweIWtOX7X4FFWi+7PuzVmNSl+ZdqOhDC1vyS7GUtTRyOuQx2QvuNznbIcd/BZlWor8S7UdLD4Wq1nFop6qgl4QynujkP4KN1af5l2o6tOg1zFbLoyc7qeo+il/JY9NT/ADLtRZjCxc6gaMnbpWjc6CZrRVREuMcjWgYt5JGSr4qrB0pJNdpIkfqZcI3CAIAgCAh1OioJHY5IY3uNuc5oJNt2aA5esVL1eHyGoCg1ipoyHU1HTMdNhGN7GsBga7IWcchIb5dA53AXyC40dq7AyJrHxRyPDRieRixO45nO3esAkeslN1eLyWoB6yU3V4vJagHrHTdXh8hqAx6w0vVofIagMesFJ1aHyGoDH6PUnVYPIagOFZqpRyMLDTsaDbnR3ieLG+Tm5jcgK9nJ9QjMNnFv/oqPSQCTk/oXG5bOT8oqPSQEug1MoYgQIA/Eb3lLpiMtwLybDsQEn9GqLqlP5DUA/Rqi6pT+Q1AP0ao+qQeQ1AZ/Ruj6pB5DUA/Ryj6rB5DUBkau0nVYPIagMS6t0jmlvqeNuIEYmgNcLjeCNx7UB5nRWjGUbhBWxNlhe8tirXhjnBxOTJT0HgeG7uyD1frHTdXi8kLAN4tEU7SHNgjBaQQQ0AgjcUBNQBAEAQBAEBxq2PLCI3BjyLB5GLB77DxKA56NoGQMwMvvJc85vked73HiSgJSAIAgCAIAgCAIAgCAIAgCAIAgCAIAgOVVTskY6ORoex4s5pzBCAjaJo3wsMbpTKxp9rLh7Y1nBjnX51unJATkAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf//Z"
      },
      {
        id: 4,
        name: "Wireless Earbuds Max",
        fullName: "Wireless Earbuds Max - Active Noise Cancellation, 30-hour Battery",
        category: "Accessories",
        price: 199,
        stock: 50,
        rating: 4.5,
        description: "High-quality wireless earbuds with active noise cancellation and long-lasting battery life.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-3ghVI59yfbOYYD3tx6rP1QAZ3GN9vTs5PV7AxF0e3Iw6tuhuZXKwgOxwjwcqPPZAiyDka4NVZXM-x3VtL9LPgX5B7wXzli6pmWWf7thIyGxksqTKultCMA"
      },
      {
        id: 5,
        name: "Smartwatch Elite 5",
        fullName: "Smartwatch Elite 5 - AMOLED Display, GPS, Heart Rate Monitoring",
        category: "Wearables",
        price: 299,
        stock: 30,
        rating: 4.7,
        description: "A stylish smartwatch with fitness tracking, GPS, and an always-on AMOLED display.",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJz6SlGqslteAqhTWLhrYT0GOrdSkcjkl_41VSaa4kGKnU1nHcgFmPLZlod3pr2u5JumE14G2wQnzgYwpj9IzEQchwnIclkxTi3vBvrntdmOX3igtkPcjWFg"
      },
      {
        id: 6,
        name: "Mechanical Keyboard RGB",
        fullName: "Mechanical Keyboard RGB - Blue Switches, Custom Backlight",
        category: "Accessories",
        price: 149,
        stock: 40,
        rating: 4.6,
        description: "A premium mechanical keyboard with customizable RGB lighting and tactile blue switches.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRKWWo-LXSjYSWmL-M8MxCoCCvHkSURybSLxYr4_VkT1QHFpPBJYiSE0NL0pWwdmLK2VHxozAuxm9JEfYd6yF7Dh8KNOuEwm-vutqT3zl3L3uOM9ySakL3u5Q"
      },
      {
        id: 7,
        name: "Ergonomic Wireless Mouse",
        fullName: "Ergonomic Wireless Mouse - Adjustable DPI, Silent Clicks",
        category: "Accessories",
        price: 79,
        stock: 60,
        rating: 4.4,
        description: "A comfortable, ergonomic wireless mouse with customizable DPI settings and silent clicking.",
        image: "data:image/jpeg;base64,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"
      },
      {
        id: 8,
        name: "Noise-Canceling Headphones",
        fullName: "Noise-Canceling Headphones - Over-Ear, Hi-Fi Audio, 40h Battery",
        category: "Accessories",
        price: 249,
        stock: 20,
        rating: 4.8,
        description: "High-fidelity headphones with active noise cancellation and a long battery life for uninterrupted listening.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVKEqvgqQMxX9rIJ7Ki9lB6ImUeyTcaVpaXXNHd2_Dw1HFFtDvvSEhLGXo_vSuOOiN6u_u9h3Lsu8RnrozYFYNfIHMsagxQq7kOl4tVvGJJctghvOpmIO_lA"
      },
      {
        id: 9,
        name: "boat Stone",
        fullName: "boAt Stone 350 Pro/358 Pro With Dynamic Rgb Leds,12 Hrs Playback",
        category: "Accessories",
        price: 129,
        stock: 35,
        rating: 4.5,
        description: "A compact Bluetooth speaker with deep bass, 360-degree sound, and waterproof design.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVE04d3iGej53E6JC-xFnI4OOWaaINEXjxhglw9JmFYZWvCxlocBadvEsUX3106xV0Ai_mwVhItKM3rKEItNs8ydCKrHLh2Bo-0RVAE6ZLByQFBLJv505F"
      },
      {
        id: 10,
        name: "Fast Charging Power Bank",
        fullName: "Fast Charging Power Bank - 20000mAh, USB-C, Quick Charge",
        category: "Accessories",
        price: 59,
        stock: 70,
        rating: 4.3,
        description: "A high-capacity power bank with fast charging and multiple USB ports for on-the-go power.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTYiQp4zwRDAQC6wYUWX6L9AVnuidArBkvARdwiAYCCCNUAY5oNraScssuInoPG4Xga79QLPcgAzIPAYu6IuDrFMggIB8kd3GL2-5ymzz4"
      },
      {
        id: 11,
        name: "Robot Vacuum Cleaner",
        fullName: "Robot Vacuum Cleaner - Smart Mapping, Auto-Charging",
        category: "Home Appliances",
        price: 399,
        stock: 10,
        rating: 4.7,
        description: "An advanced robotic vacuum cleaner with smart mapping and automatic charging.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR-IdECNAAmRcBx2KNFjlGMsXajSO6imPa0kFkglfsRpAD_3WCao2H9lEuxM4i-v3P4LvpLufh9ja6xxzhWLRKDt1IX7aFd9Mrp71jiDu0KAZaIVxG8mOho"
      },
      {
        id: 12,
        name: "Air Purifier Advanced",
        fullName: "Air Purifier Advanced - HEPA Filter, Smart Sensor",
        category: "Home Appliances",
        price: 299,
        stock: 20,
        rating: 4.6,
        description: "A powerful air purifier with HEPA filtration and a real-time air quality sensor.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQ6prMm6A2dL23BZRYjaOn0eFvJZmvMGjxZ_3ljfdR6LPsZBfQinPIGFnN-uNkw9mSoDj6CtJF5EQerRoPxGYILbR3j0-FUemY1YTT90xuWNXwzFZHXE96"
      },
      {
        id: 13,
        name: "Smart LED Light Strip",
        fullName: "Smart LED Light Strip - App Control, Voice Assistant Compatible",
        category: "Home Appliances",
        price: 49,
        stock: 100,
        rating: 4.5,
        description: "Customizable LED light strip with app and voice control for personalized lighting.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk-BCGoP2C3bJIbqIZjBJ65eRo0-m-j4PNN5X8s-LSmWm7um53FM3uKqM3v-v46gcaB3a2NkzpLopKr6wwmE8jd5XFmNgflP2imnb2aPafYSJNn1EnRLvnIQ"
      },
      {
        id: 14,
        name: "Coffee Maker Deluxe",
        fullName: "Coffee Maker Deluxe - Espresso & Drip, Auto Timer",
        category: "Home Appliances",
        price: 199,
        stock: 25,
        rating: 4.8,
        description: "A versatile coffee maker with both espresso and drip brewing options and an auto-start timer.",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCWhvBTpMjRu_kV5bJper9VGaTT-Vbs2QJwQprkjC9gcK1MiYJ6Wex87RPw_DwafCCXNm8qf2W-iNtkpQbN_BNpBtOkEXHSlo-kCG1hAgrDFfw5ddCei-hHg"
      },
      {
        id: 15,
        name: "Electric Kettle Pro",
        fullName: "Electric Kettle Pro - Stainless Steel, Rapid Boil",
        category: "Home Appliances",
        price: 79,
        stock: 40,
        rating: 4.5,
        description: "A high-speed electric kettle with stainless steel build and temperature control.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_lla06gvy5dh3SwzJ0xV5uzFG0tYY5OsZJKDbJ2xKMLGC2EzCAskVBba0phBxIpoZ2AK6OIWW5jTI9GbAVr3vSy1BJfQbIXopT21RYD2wL0W7rz0hOgUr0g"
      },
      {
        id: 16,
        name: "Fitness Tracker Band",
        fullName: "Fitness Tracker Band - Heart Rate, Sleep Monitoring, Waterproof",
        category: "Wearables",
        price: 129,
        stock: 30,
        rating: 4.6,
        description: "A sleek fitness tracker with real-time heart rate monitoring and waterproof design.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6k6ZKuOjoSHzDZ4u6Ceo3ZZ6zw-hEyKcAfluAnXHSsBkXjCx_0FroEWIC0T9FMEz-I5uVEPx8xOH9APDZoW6IE0b6mJ5Ut5aCj1KWcFuEQR2YP00gcJSR"
      },
      {
        id: 17,
        name: "Adjustable Dumbbells Set",
        fullName: "Adjustable Dumbbells Set - 5-50lbs, Quick Lock System",
        category: "Fitness",
        price: 299,
        stock: 15,
        rating: 4.7,
        description: "A set of adjustable dumbbells with quick lock system for easy weight changes.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRdB_x4QFN9OTGak-ZQORstOeh5WMN9HFkmpV-xX9q2TpOtvY-esL19seWoqhNDF6iYspd2KXNDrVwKRkw7KRi_ZEn9DQXY9dvAPm3SToo"
      },
      {
        id: 18,
        name: "Resistance Bands Pack",
        fullName: "Resistance Bands Pack - 5 Levels, Non-Slip Grip",
        category: "Fitness",
        price: 49,
        stock: 80,
        rating: 4.4,
        description: "A set of resistance bands with different levels for versatile workouts.",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYOQozTLaThSHyAZASUsDQy6h97YLRv_sTCZSdmMhulVZBcBvPr_AHl1X6gZn0Ri_YwbSnu4_nfLFmx82aRII47gHIhsKKvaxyx5kn3q6OhR864jId6hPn"
      },
      {
        id: 19,
        name: "Mirrorless Camera Z7",
        fullName: "Mirrorless Camera Z7 - 45MP, 4K Video, Wi-Fi",
        category: "Cameras",
        price: 1799,
        stock: 5,
        rating: 4.9,
        description: "A professional mirrorless camera with high-resolution sensor and 4K recording capabilities.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQYbCWo27wex-v7ZgzcvCahqj4NRYFf4rgsaOASxZNbwmR5vGPUmSvngrzaNq_hxwF9LEdL5fXw8PHKHqy_S9o6gYLmttKZ5lzq2hTi2w6ilzwJrYKDjGV"
      },
      {
        id: 20,
        name: "Drone Explorer 4K",
        fullName: "Drone Explorer 4K - GPS, 60-Min Flight Time, Obstacle Avoidance",
        category: "Cameras",
        price: 1299,
        stock: 8,
        rating: 4.8,
        description: "A high-performance drone with advanced GPS tracking and 4K video recording.",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQtF_8Ccw1Kh_6voFtXE8JmmUvXtB1FsR9W5ChlSYr6ob05WdcXVtZ78Qq22NOxRSjjuL-d0ijbnC_4iBB-dM33H82gJ-XISViweQvaDDY"
      },
      {
        id: 21,
        name: "Men's Leather Jacket",
        fullName: "Men's Premium Leather Jacket - Stylish & Warm",
        category: "Clothing",
        price: 129,
        stock: 40,
        rating: 4.7,
        description: "A premium leather jacket with a stylish look and comfortable fit for all seasons.",
        image: "data:image/jpeg;base64,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"
      },
      {
        id: 22,
        name: "Women's Winter Coat",
        fullName: "Women's Long Winter Coat - Windproof & Warm",
        category: "Clothing",
        price: 149,
        stock: 30,
        rating: 4.8,
        description: "Elegant long winter coat with thick insulation for warmth and comfort.",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpc8FdfH3JiIdrfblK58RaiGG2hT_c5w1ogMp5ioGrccuNgP4ytvU40AsQVWhh38BFGmpdo5UiWORXtwMLpVKwbSstm8qHl65cUf9JJdT9FDtVGsKEdlaloA"
      },
      {
        id: 23,
        name: "Running Shoes",
        fullName: "Men's Running Shoes - Lightweight & Durable",
        category: "Shoes",
        price: 89,
        stock: 60,
        rating: 4.6,
        description: "Breathable and lightweight running shoes designed for maximum comfort and performance.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4zdRa9IcZfM_Jg_u-dzGz8Gj6Z5XDoFQU4UznKVD_sSD65cw3ugOFyCkgShQJCVdzQddAF9W0JGU0x04FefSo6_JfD4Q22l0ebQI91ZY"
      },
      {
        id: 24,
        name: "Women's Sneakers",
        fullName: "Women's Casual Sneakers - Stylish & Comfortable",
        category: "Shoes",
        price: 79,
        stock: 55,
        rating: 4.7,
        description: "Trendy and comfortable sneakers for everyday wear with a stylish design.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQoXGjMmf3c1Jxgm7sBHEzw6PY2DmuEcOSytCXN6pkx30knDrkSw6nIHHdkxj8y4s5qnBgoBH3DGnmgQhD5uOdch2ai5BPclHnaaJij9ntt1fCwCnUKCnT"
      },
      {
        id: 25,
        name: "Casual Hoodie",
        fullName: "Unisex Casual Hoodie - Soft & Warm",
        category: "Clothing",
        price: 49,
        stock: 70,
        rating: 4.5,
        description: "A cozy hoodie perfect for casual wear, made with high-quality cotton blend.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAVlDwTHcoEQ59RSekhms4ONKciL2ilpNEeIsrfFoIxwl345HDM2EToMOTnCPZ_Z2PeSz8marBNDaP9Qb8TWoXcRra0KRpvb6PHpcQAiBxKw_GM0w0leujOw"
      },
      {
        id: 26,
        name: "Formal Dress Shoes",
        fullName: "Men's Formal Dress Shoes - Classic Leather",
        category: "Shoes",
        price: 120,
        stock: 35,
        rating: 4.8,
        description: "Elegant leather dress shoes, ideal for office wear and special occasions.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSl_SgsvKFFss02ibEeZHTemXE5Me8PbQh3GHx2HExnSAUDb3486TllyGNXuaE9KhWXKODDH_NYuWxS3UCFKj0ps8u8e-54hmAopQQR-1DpHpf1vASEL43zSQ"
      },
      {
        id: 27,
        name: "Women's High Heels",
        fullName: "Women's Stylish High Heels - Comfortable Fit",
        category: "Shoes",
        price: 99,
        stock: 45,
        rating: 4.6,
        description: "Chic and stylish high heels with a comfortable sole for long wear.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRmNgWKj6Z97tEr446vnK7MkKjeEIDAmvdIYF9c9hnISoqCfSXn1bQBUzj8nxjXl3iQSEsz7uEbZEJXZ_Z9IEzgAS91gPZW48YMEeHSFMLw7x-xeEXtDiOn"
      },
      {
        id: 28,
        name: "Slim Fit Jeans",
        fullName: "Men's Slim Fit Jeans - Comfortable & Stretchable",
        category: "Clothing",
        price: 59,
        stock: 65,
        rating: 4.4,
        description: "Modern slim-fit jeans with a stretchable fabric for a perfect fit.",
        image: "data:image/jpeg;base64,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"
      },
      {
        id: 29,
        name: "Women's Yoga Pants",
        fullName: "Women's Yoga & Workout Pants - Stretchable & Breathable",
        category: "Clothing",
        price: 45,
        stock: 80,
        rating: 4.7,
        description: "High-quality yoga pants designed for flexibility and comfort during workouts.",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb97676c-c739-4ad8-b4f2-120672e7aeea.__CR0,0,600,450_PT0_SX600_V1___.png"
      },
      {
        id: 30,
        name: "Sports Sneakers",
        fullName: "Men Puma Smashic Unisex Sneakers At Nykaa",
        category: "Shoes",
        price: 95,
        stock: 50,
        rating: 4.5,
        description: "Premium quality sports sneakers with shock-absorbing technology for high-impact activities.",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGxrTqHo0pADmCZkm6YJ563Dp94pI_G7LlTKlByvpVM7nOuBDhJAv9X9VECidEUr98Xx32sLBMl7tWlpP8a-by9ZJCyGlQrsZTTDsa-eKM75Xghuc9x-NI"
      },
      {
        id: 31,
        name: "Radiant Glow Face Serum",
        description: "Hydrates & brightens skin with Vitamin C.",
        category: "Beauty",
        price: 25,
        stock: 100,
        rating: 4.7,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ67USI_QrMY2hYYSzvGu2_lBRG1FglWTBQLpEMUxNwBFUXgnaAa1UB4Nbg53o19E3b_1jxGCk8VeDToYbVBdBjaiyqbV5b6lF7WPUf65VmgP76QMH4txvPcg"
      },
      {
        id: 32,
        name: "Velvet Matte Lipstick Set",
        description: "Long-lasting, smudge-proof lipsticks.",
        category: "Beauty",
        price: 18,
        stock: 80,
        rating: 4.5,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRjtePqsEhjEfIszhvx10RTljfhq1OsCFUqqtHdR93ww6oqIGqYh7yZn6yAwRKWp7VMXCDEm-frMkDHP1WDh_j3rPElQLisa4Opid7WP3tT"
      },
      {
          id: 33,
          name: "Organic Green Detox Tea",
          category: "Health",
            description: "Boosts metabolism and immunity.",
            price: 15,
            stock: 200,
            rating: 4.6,
            image: "https://organicindia.com/cdn/shop/files/detox-kahwa-benefits.jpg?v=1734090694"
          },
          {
            id: 34,
            name: "Omega-3 Fish Oil Capsules",
            description: "Supports heart and brain health.",
            category: "Health",
            price: 22,
            stock: 150,
            rating: 4.8,
            image: "https://m.media-amazon.com/images/I/61Sa75O4MlL.jpg"
          },
          {
            id: 35,
            name: "Interactive Talking Teddy Bear",
            description: "Speaks & plays lullabies for kids.",
            category:"Toys",
            price: 30,
            stock: 50,
            rating: 4.9,
            image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcROjkeR19VdTOw2dzPEbd5tHEOFSAGe5JZy5VphA-XfQKdduIdmRlHeGWxoIJppTXKkUeUipXM8wEgT7pUXCiD7Zu3z-v0KNTfSbKzzkyJh1be5tYx7-QMl"
          },
          {
            id: 36,
            name: "Magnetic Building Blocks Set",
            description: "STEM toy for creativity.",
            category:"Toys",
            price: 40,
            stock: 75,
            rating: 4.7,
            image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUwO1W-E3-aN3VFSvv9Jc2CGgabrW4UUa9MMsUss2rdF97xmgsLXdWMjDfBhZXA9wMlbIo8QDGPIFVT4CgQfHaafQOEHr8B1yuCEYXKicq"
          },
          {
            id: 37,
            name: "Mindset Mastery",
            description: "Self-improvement book on success & habits.",
            category:"Books",
            price: 20,
            stock: 120,
            rating: 4.6,
            image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQRLDxlWIZPmbVesbBpdLBU0-P5OxMFjTqO-utcc8nGhKOsSnvcKBTha21eGEqDq-BPNpA0yI6GbTAtWCf81VJ6E3oUbc8DXFSFgPv7Vi35hJpFMein7ul9"
          },
          {
            id:38,
            name: "Rich Dad Poor Dad",
            description: "Financial literacy book.",
            category:"Books",
            price: 18,
            stock: 90,
            rating: 4.5,
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2O3DsHT_Lr4N-Ha8iU3aaL9KmObVaH5KnX9L-CiVzg_Bwmswv-SbPsD7v49RACCIxWzkLg4SkGN7XFVxEb4WISKaAEuT0_nKdgbPE3a7x_-YrxLCU50k16g"
          },
          {
            id: 39,
            name: "Atomic Habits",
            description: "Self-improvement book on habits & motivation.",
            category:"Books",
            price: 25,
            stock: 80,
            rating: 4.8,
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPmMTPOvgp5wSyQWUWwuV-SlU6W_mOvKXLimDJCo3T7kvt1dB1TiXUv7WFqNDVneHQ1Q6WXguENjbYP07r49exggIDKc5w0zlD0ThRA-rFPaclk_IqMAJ6",
          },
          {
            id: 40,
            name: "Aromatherapy Essential Oil Diffuser",
            description: "Creates a relaxing ambiance.",
            category:"Home & Living",
            price: 50,
            stock: 40,
            rating: 4.7,
            image: "https://m.media-amazon.com/images/I/81T5T4vSosL.jpg"
          },
          {
            id: 41,
            name: "Ultra-Plush Memory Foam Pillow",
            description: "For ultimate sleep comfort.",
            price: 30,
            stock: 60,
            rating: 4.6,
            image: "https://sleepycat.in/wp-content/uploads/2022/05/SoftTouch-Memory-Foam-Pillow-640-x-480-img-1_Pack-of-1.jpg"
          }
];
const Shop = () => {
  const { addToCart } = useCart();
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  // Filter products based on selected category
  const filteredProducts = category === "All" ? products : products.filter((p) => p.category === category);

  // Handle adding/removing from wishlist
  const handleWishlistClick = (product) => {
    if (!product || !product.id) return;

    const isInWishlist = wishlist.some((item) => item?.id === product.id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item?.id !== product.id);
      toast.info(`${product.name} removed from wishlist!`, { 
        toastId: `wishlist-remove-${product.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success(`${product.name} added to wishlist!`, { 
        toastId: `wishlist-add-${product.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Handle add to cart with toast
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { 
      toastId: `cart-add-${product.id}`,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins">
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4 mt-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 border rounded-full transition ${
              category === cat ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="text-2xl text-gray-800 p-2 border rounded transition hover:bg-gray-200"
        >
          {view === "grid" ? <CiBoxList /> : <CiGrid41 />}
        </button>
      </div>

      {/* Products Grid/List */}
      <div className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-8" : "space-y-6 mt-8"}`}>
        {filteredProducts.map((product) =>
          product?.id ? (
            <div key={product.id} className={`relative bg-white border rounded-lg shadow-md ${view === "list" ? "flex" : ""}`}>
              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistClick(product)}
                className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 bg-white bg-opacity-75 p-2 rounded-full shadow-md"
              >
                {wishlist.some((item) => item?.id === product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className={`object-cover cursor-pointer overflow-hidden transition-transform hover:scale-105 ${view === "grid" ? "w-full h-64" : "w-48 h-48"}`}
              />

              {/* Product Details */}
              <div className={`p-6 flex flex-col justify-between ${view === "list" ? "flex-1" : ""}`}>
                <h2 className="text-s font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-bold text-lg">${product.price}</p>

                  {/* Add to Cart Button */}
                  <button
                    className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-md shadow transition hover:bg-teal-600 hover:text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Shop;


// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { CiBoxList, CiGrid41 } from "react-icons/ci";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const categories = ["All","Clothing","Electronics","Accessories","Fitness","Shoes","Beauty" ,"Health","Books","Toys"];

// const furnitureProducts = [
//   {
//         id: 1,
//         name: "Smartphone Ultra X",
//         fullName: "Smartphone Ultra X - 5G, 256GB, 12GB RAM",
//         category: "Electronics",
//         price: 999,
//         stock: 25,
//         rating: 4.8,
//         description: "A high-end smartphone with a powerful processor, 5G connectivity, and an ultra-clear camera system.",
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRvnqb7s-dUFNkScMzWX1RPlMCDYuAfvC8h-d9Rs2Ig8wQKeZzTZIQZhKsTIbhabxha0CkZlG_oUeEmUJA00DWclsbE8nv-Fo8l4tvaxkc6jcgPCOF9fLseoF7kfiiLFE-WY-lsng&usqp=CAc"
//       },
//       {
//         id: 2,
//         name: "Gaming Laptop X1 Pro",
//         fullName: " Intel i9, RTX 4080, 32GB RAM",
//         category: "Electronics",
//         price: 1599,
//         stock: 15,
//         rating: 4.7,
//         description: "A powerful gaming laptop with a high refresh rate display and top-tier GPU for an immersive experience.",
//         image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEhITEBAWEBIQFhYQFhgQFRAVFhYWFhUSExUYHTQgGBoxGxkWIz0nJiktLi4uFx8zODMsNygvLisBCgoKDg0OGxAQGy0lICYvLSsvLS0tLS0tLzUtLTAtLS0tLS0vLS4tLS0tLS0tKy0tLS0tKy0vLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBAUGBwj/xABFEAACAQIDBAYFCQcEAQUBAAABAgADEQQSIQUGMVETFCJBYZEWUnGBggcjMlRykpSh0RUzQlNiscEkorLwk3ODwuHxQ//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAA3EQEAAgEBAwoFAwMEAwAAAAAAAQIRAxIhMQQTQVFxgZGhsfAFImHR4TJSwSNC8RRicoIGFTT/2gAMAwEAAhEDEQA/APcYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJgY/XqX8xPMSdmepXbr1nXqX8xPvCNmeo269Z16l/MTzEbM9Rt16zr1L+Yn3hGzPUbdes69S/mJ94Rsz1G3XrTpYhHNlZWPHQgxMTCYtE8JXZCSAgICAgICAgICAgICAgICAgICAgIFrF/u3+yf7QNFs9L0k+zJtxRTgxNsbRFGhWqp2zTWoC2U1aVKpTAbJVysCNLi98oI7TLwNVl3Bu606r1yqIKrurmr0itTqZagbObEDO7KAQNFUDugRGPLV+iSlUZUY0qzZSrUKhI6InXtowubqDlBViQLgDKO3Nq08JTzudbaDh7z4S0R0qzM8IeMb378NiWKqSBw7JK+VolMRhyZ2rU9er/AORv1kYSr+1anr1f/I36xgV/a1T16n32/WMANrP69X77frGBX9rv61T77frGBnbIOLxlQ0cOlatUCGoQtS2VFIBYliABcganvEYG49GNr6Xw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"
//       },
//       {
//         id: 3,
//         name: "4K Smart TV Pro",
//         fullName: "4K Smart TV Pro - 65-inch OLED, Dolby Vision, AI Processing",
//         category: "Electronics",
//         price: 1299,
//         stock: 10,
//         rating: 4.6,
//         description: "A premium 65-inch OLED Smart TV with stunning 4K resolution, AI-powered upscaling, and Dolby Atmos sound.",
//         image: "data:image/jpeg;base64,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"
//       },
//       {
//         id: 4,
//         name: "Wireless Earbuds Max",
//         fullName: "Wireless Earbuds Max - Active Noise Cancellation, 30-hour Battery",
//         category: "Accessories",
//         price: 199,
//         stock: 50,
//         rating: 4.5,
//         description: "High-quality wireless earbuds with active noise cancellation and long-lasting battery life.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-3ghVI59yfbOYYD3tx6rP1QAZ3GN9vTs5PV7AxF0e3Iw6tuhuZXKwgOxwjwcqPPZAiyDka4NVZXM-x3VtL9LPgX5B7wXzli6pmWWf7thIyGxksqTKultCMA"
//       },
//       {
//         id: 5,
//         name: "Smartwatch Elite 5",
//         fullName: "Smartwatch Elite 5 - AMOLED Display, GPS, Heart Rate Monitoring",
//         category: "Wearables",
//         price: 299,
//         stock: 30,
//         rating: 4.7,
//         description: "A stylish smartwatch with fitness tracking, GPS, and an always-on AMOLED display.",
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJz6SlGqslteAqhTWLhrYT0GOrdSkcjkl_41VSaa4kGKnU1nHcgFmPLZlod3pr2u5JumE14G2wQnzgYwpj9IzEQchwnIclkxTi3vBvrntdmOX3igtkPcjWFg"
//       },
//       {
//         id: 6,
//         name: "Mechanical Keyboard RGB",
//         fullName: "Mechanical Keyboard RGB - Blue Switches, Custom Backlight",
//         category: "Accessories",
//         price: 149,
//         stock: 40,
//         rating: 4.6,
//         description: "A premium mechanical keyboard with customizable RGB lighting and tactile blue switches.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRKWWo-LXSjYSWmL-M8MxCoCCvHkSURybSLxYr4_VkT1QHFpPBJYiSE0NL0pWwdmLK2VHxozAuxm9JEfYd6yF7Dh8KNOuEwm-vutqT3zl3L3uOM9ySakL3u5Q"
//       },
//       {
//         id: 7,
//         name: "Ergonomic Wireless Mouse",
//         fullName: "Ergonomic Wireless Mouse - Adjustable DPI, Silent Clicks",
//         category: "Accessories",
//         price: 79,
//         stock: 60,
//         rating: 4.4,
//         description: "A comfortable, ergonomic wireless mouse with customizable DPI settings and silent clicking.",
//         image: "data:image/jpeg;base64,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"
//       },
//       {
//         id: 8,
//         name: "Noise-Canceling Headphones",
//         fullName: "Noise-Canceling Headphones - Over-Ear, Hi-Fi Audio, 40h Battery",
//         category: "Accessories",
//         price: 249,
//         stock: 20,
//         rating: 4.8,
//         description: "High-fidelity headphones with active noise cancellation and a long battery life for uninterrupted listening.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVKEqvgqQMxX9rIJ7Ki9lB6ImUeyTcaVpaXXNHd2_Dw1HFFtDvvSEhLGXo_vSuOOiN6u_u9h3Lsu8RnrozYFYNfIHMsagxQq7kOl4tVvGJJctghvOpmIO_lA"
//       },
//       {
//         id: 9,
//         name: "boat Stone",
//         fullName: "boAt Stone 350 Pro/358 Pro With Dynamic Rgb Leds,12 Hrs Playback",
//         category: "Accessories",
//         price: 129,
//         stock: 35,
//         rating: 4.5,
//         description: "A compact Bluetooth speaker with deep bass, 360-degree sound, and waterproof design.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVE04d3iGej53E6JC-xFnI4OOWaaINEXjxhglw9JmFYZWvCxlocBadvEsUX3106xV0Ai_mwVhItKM3rKEItNs8ydCKrHLh2Bo-0RVAE6ZLByQFBLJv505F"
//       },
//       {
//         id: 10,
//         name: "Fast Charging Power Bank",
//         fullName: "Fast Charging Power Bank - 20000mAh, USB-C, Quick Charge",
//         category: "Accessories",
//         price: 59,
//         stock: 70,
//         rating: 4.3,
//         description: "A high-capacity power bank with fast charging and multiple USB ports for on-the-go power.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTYiQp4zwRDAQC6wYUWX6L9AVnuidArBkvARdwiAYCCCNUAY5oNraScssuInoPG4Xga79QLPcgAzIPAYu6IuDrFMggIB8kd3GL2-5ymzz4"
//       },
//       {
//         id: 11,
//         name: "Robot Vacuum Cleaner",
//         fullName: "Robot Vacuum Cleaner - Smart Mapping, Auto-Charging",
//         category: "Home Appliances",
//         price: 399,
//         stock: 10,
//         rating: 4.7,
//         description: "An advanced robotic vacuum cleaner with smart mapping and automatic charging.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR-IdECNAAmRcBx2KNFjlGMsXajSO6imPa0kFkglfsRpAD_3WCao2H9lEuxM4i-v3P4LvpLufh9ja6xxzhWLRKDt1IX7aFd9Mrp71jiDu0KAZaIVxG8mOho"
//       },
//       {
//         id: 12,
//         name: "Air Purifier Advanced",
//         fullName: "Air Purifier Advanced - HEPA Filter, Smart Sensor",
//         category: "Home Appliances",
//         price: 299,
//         stock: 20,
//         rating: 4.6,
//         description: "A powerful air purifier with HEPA filtration and a real-time air quality sensor.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQ6prMm6A2dL23BZRYjaOn0eFvJZmvMGjxZ_3ljfdR6LPsZBfQinPIGFnN-uNkw9mSoDj6CtJF5EQerRoPxGYILbR3j0-FUemY1YTT90xuWNXwzFZHXE96"
//       },
//       {
//         id: 13,
//         name: "Smart LED Light Strip",
//         fullName: "Smart LED Light Strip - App Control, Voice Assistant Compatible",
//         category: "Home Appliances",
//         price: 49,
//         stock: 100,
//         rating: 4.5,
//         description: "Customizable LED light strip with app and voice control for personalized lighting.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk-BCGoP2C3bJIbqIZjBJ65eRo0-m-j4PNN5X8s-LSmWm7um53FM3uKqM3v-v46gcaB3a2NkzpLopKr6wwmE8jd5XFmNgflP2imnb2aPafYSJNn1EnRLvnIQ"
//       },
//       {
//         id: 14,
//         name: "Coffee Maker Deluxe",
//         fullName: "Coffee Maker Deluxe - Espresso & Drip, Auto Timer",
//         category: "Home Appliances",
//         price: 199,
//         stock: 25,
//         rating: 4.8,
//         description: "A versatile coffee maker with both espresso and drip brewing options and an auto-start timer.",
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCWhvBTpMjRu_kV5bJper9VGaTT-Vbs2QJwQprkjC9gcK1MiYJ6Wex87RPw_DwafCCXNm8qf2W-iNtkpQbN_BNpBtOkEXHSlo-kCG1hAgrDFfw5ddCei-hHg"
//       },
//       {
//         id: 15,
//         name: "Electric Kettle Pro",
//         fullName: "Electric Kettle Pro - Stainless Steel, Rapid Boil",
//         category: "Home Appliances",
//         price: 79,
//         stock: 40,
//         rating: 4.5,
//         description: "A high-speed electric kettle with stainless steel build and temperature control.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_lla06gvy5dh3SwzJ0xV5uzFG0tYY5OsZJKDbJ2xKMLGC2EzCAskVBba0phBxIpoZ2AK6OIWW5jTI9GbAVr3vSy1BJfQbIXopT21RYD2wL0W7rz0hOgUr0g"
//       },
//       {
//         id: 16,
//         name: "Fitness Tracker Band",
//         fullName: "Fitness Tracker Band - Heart Rate, Sleep Monitoring, Waterproof",
//         category: "Wearables",
//         price: 129,
//         stock: 30,
//         rating: 4.6,
//         description: "A sleek fitness tracker with real-time heart rate monitoring and waterproof design.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6k6ZKuOjoSHzDZ4u6Ceo3ZZ6zw-hEyKcAfluAnXHSsBkXjCx_0FroEWIC0T9FMEz-I5uVEPx8xOH9APDZoW6IE0b6mJ5Ut5aCj1KWcFuEQR2YP00gcJSR"
//       },
//       {
//         id: 17,
//         name: "Adjustable Dumbbells Set",
//         fullName: "Adjustable Dumbbells Set - 5-50lbs, Quick Lock System",
//         category: "Fitness",
//         price: 299,
//         stock: 15,
//         rating: 4.7,
//         description: "A set of adjustable dumbbells with quick lock system for easy weight changes.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRdB_x4QFN9OTGak-ZQORstOeh5WMN9HFkmpV-xX9q2TpOtvY-esL19seWoqhNDF6iYspd2KXNDrVwKRkw7KRi_ZEn9DQXY9dvAPm3SToo"
//       },
//       {
//         id: 18,
//         name: "Resistance Bands Pack",
//         fullName: "Resistance Bands Pack - 5 Levels, Non-Slip Grip",
//         category: "Fitness",
//         price: 49,
//         stock: 80,
//         rating: 4.4,
//         description: "A set of resistance bands with different levels for versatile workouts.",
//         image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYOQozTLaThSHyAZASUsDQy6h97YLRv_sTCZSdmMhulVZBcBvPr_AHl1X6gZn0Ri_YwbSnu4_nfLFmx82aRII47gHIhsKKvaxyx5kn3q6OhR864jId6hPn"
//       },
//       {
//         id: 19,
//         name: "Mirrorless Camera Z7",
//         fullName: "Mirrorless Camera Z7 - 45MP, 4K Video, Wi-Fi",
//         category: "Cameras",
//         price: 1799,
//         stock: 5,
//         rating: 4.9,
//         description: "A professional mirrorless camera with high-resolution sensor and 4K recording capabilities.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQYbCWo27wex-v7ZgzcvCahqj4NRYFf4rgsaOASxZNbwmR5vGPUmSvngrzaNq_hxwF9LEdL5fXw8PHKHqy_S9o6gYLmttKZ5lzq2hTi2w6ilzwJrYKDjGV"
//       },
//       {
//         id: 20,
//         name: "Drone Explorer 4K",
//         fullName: "Drone Explorer 4K - GPS, 60-Min Flight Time, Obstacle Avoidance",
//         category: "Cameras",
//         price: 1299,
//         stock: 8,
//         rating: 4.8,
//         description: "A high-performance drone with advanced GPS tracking and 4K video recording.",
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQtF_8Ccw1Kh_6voFtXE8JmmUvXtB1FsR9W5ChlSYr6ob05WdcXVtZ78Qq22NOxRSjjuL-d0ijbnC_4iBB-dM33H82gJ-XISViweQvaDDY"
//       },
//       {
//         id: 21,
//         name: "Men's Leather Jacket",
//         fullName: "Men's Premium Leather Jacket - Stylish & Warm",
//         category: "Clothing",
//         price: 129,
//         stock: 40,
//         rating: 4.7,
//         description: "A premium leather jacket with a stylish look and comfortable fit for all seasons.",
//         image: "data:image/jpeg;base64,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"
//       },
//       {
//         id: 22,
//         name: "Women's Winter Coat",
//         fullName: "Women's Long Winter Coat - Windproof & Warm",
//         category: "Clothing",
//         price: 149,
//         stock: 30,
//         rating: 4.8,
//         description: "Elegant long winter coat with thick insulation for warmth and comfort.",
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpc8FdfH3JiIdrfblK58RaiGG2hT_c5w1ogMp5ioGrccuNgP4ytvU40AsQVWhh38BFGmpdo5UiWORXtwMLpVKwbSstm8qHl65cUf9JJdT9FDtVGsKEdlaloA"
//       },
//       {
//         id: 23,
//         name: "Running Shoes",
//         fullName: "Men's Running Shoes - Lightweight & Durable",
//         category: "Shoes",
//         price: 89,
//         stock: 60,
//         rating: 4.6,
//         description: "Breathable and lightweight running shoes designed for maximum comfort and performance.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4zdRa9IcZfM_Jg_u-dzGz8Gj6Z5XDoFQU4UznKVD_sSD65cw3ugOFyCkgShQJCVdzQddAF9W0JGU0x04FefSo6_JfD4Q22l0ebQI91ZY"
//       },
//       {
//         id: 24,
//         name: "Women's Sneakers",
//         fullName: "Women's Casual Sneakers - Stylish & Comfortable",
//         category: "Shoes",
//         price: 79,
//         stock: 55,
//         rating: 4.7,
//         description: "Trendy and comfortable sneakers for everyday wear with a stylish design.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQoXGjMmf3c1Jxgm7sBHEzw6PY2DmuEcOSytCXN6pkx30knDrkSw6nIHHdkxj8y4s5qnBgoBH3DGnmgQhD5uOdch2ai5BPclHnaaJij9ntt1fCwCnUKCnT"
//       },
//       {
//         id: 25,
//         name: "Casual Hoodie",
//         fullName: "Unisex Casual Hoodie - Soft & Warm",
//         category: "Clothing",
//         price: 49,
//         stock: 70,
//         rating: 4.5,
//         description: "A cozy hoodie perfect for casual wear, made with high-quality cotton blend.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAVlDwTHcoEQ59RSekhms4ONKciL2ilpNEeIsrfFoIxwl345HDM2EToMOTnCPZ_Z2PeSz8marBNDaP9Qb8TWoXcRra0KRpvb6PHpcQAiBxKw_GM0w0leujOw"
//       },
//       {
//         id: 26,
//         name: "Formal Dress Shoes",
//         fullName: "Men's Formal Dress Shoes - Classic Leather",
//         category: "Shoes",
//         price: 120,
//         stock: 35,
//         rating: 4.8,
//         description: "Elegant leather dress shoes, ideal for office wear and special occasions.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSl_SgsvKFFss02ibEeZHTemXE5Me8PbQh3GHx2HExnSAUDb3486TllyGNXuaE9KhWXKODDH_NYuWxS3UCFKj0ps8u8e-54hmAopQQR-1DpHpf1vASEL43zSQ"
//       },
//       {
//         id: 27,
//         name: "Women's High Heels",
//         fullName: "Women's Stylish High Heels - Comfortable Fit",
//         category: "Shoes",
//         price: 99,
//         stock: 45,
//         rating: 4.6,
//         description: "Chic and stylish high heels with a comfortable sole for long wear.",
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRmNgWKj6Z97tEr446vnK7MkKjeEIDAmvdIYF9c9hnISoqCfSXn1bQBUzj8nxjXl3iQSEsz7uEbZEJXZ_Z9IEzgAS91gPZW48YMEeHSFMLw7x-xeEXtDiOn"
//       },
//       {
//         id: 28,
//         name: "Slim Fit Jeans",
//         fullName: "Men's Slim Fit Jeans - Comfortable & Stretchable",
//         category: "Clothing",
//         price: 59,
//         stock: 65,
//         rating: 4.4,
//         description: "Modern slim-fit jeans with a stretchable fabric for a perfect fit.",
//         image: "data:image/jpeg;base64,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"
//       },
//       {
//         id: 29,
//         name: "Women's Yoga Pants",
//         fullName: "Women's Yoga & Workout Pants - Stretchable & Breathable",
//         category: "Clothing",
//         price: 45,
//         stock: 80,
//         rating: 4.7,
//         description: "High-quality yoga pants designed for flexibility and comfort during workouts.",
//         image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb97676c-c739-4ad8-b4f2-120672e7aeea.__CR0,0,600,450_PT0_SX600_V1___.png"
//       },
//       {
//         id: 30,
//         name: "Sports Sneakers",
//         fullName: "Men Puma Smashic Unisex Sneakers At Nykaa",
//         category: "Shoes",
//         price: 95,
//         stock: 50,
//         rating: 4.5,
//         description: "Premium quality sports sneakers with shock-absorbing technology for high-impact activities.",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGxrTqHo0pADmCZkm6YJ563Dp94pI_G7LlTKlByvpVM7nOuBDhJAv9X9VECidEUr98Xx32sLBMl7tWlpP8a-by9ZJCyGlQrsZTTDsa-eKM75Xghuc9x-NI"
//       },
//       {
//         id: 31,
//         name: "Radiant Glow Face Serum",
//         description: "Hydrates & brightens skin with Vitamin C.",
//         category: "Beauty",
//         price: 25,
//         stock: 100,
//         rating: 4.7,
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ67USI_QrMY2hYYSzvGu2_lBRG1FglWTBQLpEMUxNwBFUXgnaAa1UB4Nbg53o19E3b_1jxGCk8VeDToYbVBdBjaiyqbV5b6lF7WPUf65VmgP76QMH4txvPcg"
//       },
//       {
//         id: 32,
//         name: "Velvet Matte Lipstick Set",
//         description: "Long-lasting, smudge-proof lipsticks.",
//         category: "Beauty",
//         price: 18,
//         stock: 80,
//         rating: 4.5,
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRjtePqsEhjEfIszhvx10RTljfhq1OsCFUqqtHdR93ww6oqIGqYh7yZn6yAwRKWp7VMXCDEm-frMkDHP1WDh_j3rPElQLisa4Opid7WP3tT"
//       },
//       {
//           id: 33,
//           name: "Organic Green Detox Tea",
//           category: "Health",
//             description: "Boosts metabolism and immunity.",
//             price: 15,
//             stock: 200,
//             rating: 4.6,
//             image: "https://organicindia.com/cdn/shop/files/detox-kahwa-benefits.jpg?v=1734090694"
//           },
//           {
//             id: 34,
//             name: "Omega-3 Fish Oil Capsules",
//             description: "Supports heart and brain health.",
//             category: "Health",
//             price: 22,
//             stock: 150,
//             rating: 4.8,
//             image: "https://m.media-amazon.com/images/I/61Sa75O4MlL.jpg"
//           },
//           {
//             id: 35,
//             name: "Interactive Talking Teddy Bear",
//             description: "Speaks & plays lullabies for kids.",
//             category:"Toys",
//             price: 30,
//             stock: 50,
//             rating: 4.9,
//             image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcROjkeR19VdTOw2dzPEbd5tHEOFSAGe5JZy5VphA-XfQKdduIdmRlHeGWxoIJppTXKkUeUipXM8wEgT7pUXCiD7Zu3z-v0KNTfSbKzzkyJh1be5tYx7-QMl"
//           },
//           {
//             id: 36,
//             name: "Magnetic Building Blocks Set",
//             description: "STEM toy for creativity.",
//             category:"Toys",
//             price: 40,
//             stock: 75,
//             rating: 4.7,
//             image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUwO1W-E3-aN3VFSvv9Jc2CGgabrW4UUa9MMsUss2rdF97xmgsLXdWMjDfBhZXA9wMlbIo8QDGPIFVT4CgQfHaafQOEHr8B1yuCEYXKicq"
//           },
//           {
//             id: 37,
//             name: "Mindset Mastery",
//             description: "Self-improvement book on success & habits.",
//             category:"Books",
//             price: 20,
//             stock: 120,
//             rating: 4.6,
//             image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQRLDxlWIZPmbVesbBpdLBU0-P5OxMFjTqO-utcc8nGhKOsSnvcKBTha21eGEqDq-BPNpA0yI6GbTAtWCf81VJ6E3oUbc8DXFSFgPv7Vi35hJpFMein7ul9"
//           },
//           {
//             id:38,
//             name: "Rich Dad Poor Dad",
//             description: "Financial literacy book.",
//             category:"Books",
//             price: 18,
//             stock: 90,
//             rating: 4.5,
//             image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2O3DsHT_Lr4N-Ha8iU3aaL9KmObVaH5KnX9L-CiVzg_Bwmswv-SbPsD7v49RACCIxWzkLg4SkGN7XFVxEb4WISKaAEuT0_nKdgbPE3a7x_-YrxLCU50k16g"
//           },
//           {
//             id: 39,
//             name: "Atomic Habits",
//             description: "Self-improvement book on habits & motivation.",
//             category:"Books",
//             price: 25,
//             stock: 80,
//             rating: 4.8,
//             image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPmMTPOvgp5wSyQWUWwuV-SlU6W_mOvKXLimDJCo3T7kvt1dB1TiXUv7WFqNDVneHQ1Q6WXguENjbYP07r49exggIDKc5w0zlD0ThRA-rFPaclk_IqMAJ6",
//           },
//           {
//             id: 40,
//             name: "Aromatherapy Essential Oil Diffuser",
//             description: "Creates a relaxing ambiance.",
//             category:"Home & Living",
//             price: 50,
//             stock: 40,
//             rating: 4.7,
//             image: "https://m.media-amazon.com/images/I/81T5T4vSosL.jpg"
//           },
//           {
//             id: 41,
//             name: "Ultra-Plush Memory Foam Pillow",
//             description: "For ultimate sleep comfort.",
//             price: 30,
//             stock: 60,
//             rating: 4.6,
//             image: "https://sleepycat.in/wp-content/uploads/2022/05/SoftTouch-Memory-Foam-Pillow-640-x-480-img-1_Pack-of-1.jpg"
//           }
// ];

// const Shop = () => {
//   const { addToCart } = useCart();
//   const [view, setView] = useState("grid");
//   const [category, setCategory] = useState("All");
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(storedWishlist);
//   }, []);

//   const filteredProducts = category === "All" ? furnitureProducts : furnitureProducts.filter((p) => p.category === category);

//   const handleWishlistClick = (product) => {
//     setWishlist((prevWishlist) => {
//       if (prevWishlist.some((item) => item.id === product.id)) {
//         toast.info("Already in wishlist!", { position: "top-right", autoClose: 2000 });
//         return prevWishlist;
//       }
//       const updatedWishlist = [...prevWishlist, product];
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       toast.success(`${product.name} added to wishlist!`, { position: "top-right", autoClose: 2000 });
//       return updatedWishlist;
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 font-poppins">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

//       {/* Hero Banner */}
//       {/* <div className="relative h-96 bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: "url('https://source.unsplash.com/1200x600/?interior,home')" }}>
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
//           <h1 className="text-5xl font-bold">Elevate Your Space</h1>
//           <p className="mt-3 text-lg">Explore timeless furniture designs for every room.</p>
//         </div>
//       </div> */}

//       {/* Category Selection */}
//       <div className="flex flex-wrap justify-center gap-4 mt-20">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             className={`px-4 py-2 border rounded-full transition ${
//               category === cat ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* View Toggle */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={() => setView(view === "grid" ? "list" : "grid")}
//           className="text-2xl text-gray-800 p-2 border rounded transition hover:bg-gray-200"
//         >
//           {view === "grid" ? <CiBoxList /> : <CiGrid41 />}
//         </button>
//       </div>

//       {/* Products Grid/List */}
//       <div className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-8" : "space-y-6 mt-8"}`}>
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className={`relative bg-white border rounded-lg shadow-md  ${
//               view === "list" ? "flex" : ""
//             }`}
//           >
//             {/* Wishlist Button */}
//             <button
//               onClick={() => handleWishlistClick(product)}
//               className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 bg-white bg-opacity-75 p-2 rounded-full shadow-md"
//             >
//               {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />}
//             </button>

//             <img
//               src={product.image}
//               alt={product.name}
//               className={`object-cover cursor-pointer overflow-hidden transition-transform hover:scale-105 ${view === "grid" ? "w-full h-64" : "w-48 h-48"}`}
//             />

//             <div className={`p-6 flex flex-col justify-between ${view === "list" ? "flex-1" : ""}`}>
//               <h2 className="text-s font-semibold text-gray-800">{product.name}</h2>
//               <p className="text-gray-500 text-sm mb-4">{product.category}</p>
//               <div className="flex items-center justify-between">
//                 <p className="text-green-600 font-bold text-lg">${product.price}</p>
//                 <button
//                   className="px-4 py-2 border-2 border-teal-600 text-teal-600   rounded-md shadow transition hover:bg-teal-600 hover:text-white"
//                   onClick={() => {
//                     addToCart(product);
//                     toast.success(`${product.name} added to cart!`);
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Shop;


// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { CiBoxList, CiGrid41 } from "react-icons/ci";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const categories = ["All", "Electronics", "Clothing", "Accessories", "Shoes", "Books", "Health", "Toys", "Beauty"];

// const Shop = () => {
//   const { addToCart } = useCart();
//   const [view, setView] = useState("grid");
//   const [category, setCategory] = useState("All");
//   const [wishlist, setWishlist] = useState([]);

//   // Load wishlist from localStorage on mount
//   useEffect(() => {
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(storedWishlist);
//   }, []);

//   // Dummy product data
//   const products = [
//      {
//     id: 1,
//     name: "Smartphone Ultra X",
//     fullName: "Smartphone Ultra X - 5G, 256GB, 12GB RAM",
//     category: "Electronics",
//     price: 999,
//     stock: 25,
//     rating: 4.8,
//     description: "A high-end smartphone with a powerful processor, 5G connectivity, and an ultra-clear camera system.",
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRvnqb7s-dUFNkScMzWX1RPlMCDYuAfvC8h-d9Rs2Ig8wQKeZzTZIQZhKsTIbhabxha0CkZlG_oUeEmUJA00DWclsbE8nv-Fo8l4tvaxkc6jcgPCOF9fLseoF7kfiiLFE-WY-lsng&usqp=CAc"
//   },
//   {
//     id: 2,
//     name: "Gaming Laptop X1 Pro",
//     fullName: " Intel i9, RTX 4080, 32GB RAM",
//     category: "Electronics",
//     price: 1599,
//     stock: 15,
//     rating: 4.7,
//     description: "A powerful gaming laptop with a high refresh rate display and top-tier GPU for an immersive experience.",
//     image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEhITEBAWEBIQFhYQFhgQFRAVFhYWFhUSExUYHTQgGBoxGxkWIz0nJiktLi4uFx8zODMsNygvLisBCgoKDg0OGxAQGy0lICYvLSsvLS0tLS0tLzUtLTAtLS0tLS0vLS4tLS0tLS0tKy0tLS0tKy0vLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBAUGBwj/xABFEAACAQIDBAYFCQcEAQUBAAABAgADEQQSIQUGMVETFCJBYZEWUnGBggcjMlRykpSh0RUzQlNiscEkorLwk3ODwuHxQ//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAA3EQEAAgEBAwoFAwMEAwAAAAAAAQIRAxIhMQQTQVFxgZGhsfAFImHR4TJSwSNC8RRicoIGFTT/2gAMAwEAAhEDEQA/APcYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJgY/XqX8xPMSdmepXbr1nXqX8xPvCNmeo269Z16l/MTzEbM9Rt16zr1L+Yn3hGzPUbdes69S/mJ94Rsz1G3XrTpYhHNlZWPHQgxMTCYtE8JXZCSAgICAgICAgICAgICAgICAgICAgIFrF/u3+yf7QNFs9L0k+zJtxRTgxNsbRFGhWqp2zTWoC2U1aVKpTAbJVysCNLi98oI7TLwNVl3Bu606r1yqIKrurmr0itTqZagbObEDO7KAQNFUDugRGPLV+iSlUZUY0qzZSrUKhI6InXtowubqDlBViQLgDKO3Nq08JTzudbaDh7z4S0R0qzM8IeMb378NiWKqSBw7JK+VolMRhyZ2rU9er/AORv1kYSr+1anr1f/I36xgV/a1T16n32/WMANrP69X77frGBX9rv61T77frGBnbIOLxlQ0cOlatUCGoQtS2VFIBYliABcganvEYG49GNr6Xw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"
//   },
//   {
//     id: 3,
//     name: "4K Smart TV Pro",
//     fullName: "4K Smart TV Pro - 65-inch OLED, Dolby Vision, AI Processing",
//     category: "Electronics",
//     price: 1299,
//     stock: 10,
//     rating: 4.6,
//     description: "A premium 65-inch OLED Smart TV with stunning 4K resolution, AI-powered upscaling, and Dolby Atmos sound.",
//     image: "data:image/jpeg;base64,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"
//   },
//   {
//     id: 4,
//     name: "Wireless Earbuds Max",
//     fullName: "Wireless Earbuds Max - Active Noise Cancellation, 30-hour Battery",
//     category: "Accessories",
//     price: 199,
//     stock: 50,
//     rating: 4.5,
//     description: "High-quality wireless earbuds with active noise cancellation and long-lasting battery life.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-3ghVI59yfbOYYD3tx6rP1QAZ3GN9vTs5PV7AxF0e3Iw6tuhuZXKwgOxwjwcqPPZAiyDka4NVZXM-x3VtL9LPgX5B7wXzli6pmWWf7thIyGxksqTKultCMA"
//   },
//   {
//     id: 5,
//     name: "Smartwatch Elite 5",
//     fullName: "Smartwatch Elite 5 - AMOLED Display, GPS, Heart Rate Monitoring",
//     category: "Wearables",
//     price: 299,
//     stock: 30,
//     rating: 4.7,
//     description: "A stylish smartwatch with fitness tracking, GPS, and an always-on AMOLED display.",
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJz6SlGqslteAqhTWLhrYT0GOrdSkcjkl_41VSaa4kGKnU1nHcgFmPLZlod3pr2u5JumE14G2wQnzgYwpj9IzEQchwnIclkxTi3vBvrntdmOX3igtkPcjWFg"
//   },
//   {
//     id: 6,
//     name: "Mechanical Keyboard RGB",
//     fullName: "Mechanical Keyboard RGB - Blue Switches, Custom Backlight",
//     category: "Accessories",
//     price: 149,
//     stock: 40,
//     rating: 4.6,
//     description: "A premium mechanical keyboard with customizable RGB lighting and tactile blue switches.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRKWWo-LXSjYSWmL-M8MxCoCCvHkSURybSLxYr4_VkT1QHFpPBJYiSE0NL0pWwdmLK2VHxozAuxm9JEfYd6yF7Dh8KNOuEwm-vutqT3zl3L3uOM9ySakL3u5Q"
//   },
//   {
//     id: 7,
//     name: "Ergonomic Wireless Mouse",
//     fullName: "Ergonomic Wireless Mouse - Adjustable DPI, Silent Clicks",
//     category: "Accessories",
//     price: 79,
//     stock: 60,
//     rating: 4.4,
//     description: "A comfortable, ergonomic wireless mouse with customizable DPI settings and silent clicking.",
//     image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhMQERIQEBASFhAVFxYWEhUWDxIVFRUWFhUSFRYYICggGB0mHhUVITEiKSktLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGC0lICYrLysrKy0tKystLS8tKy0rLSsvLS0tLSstLTUtLS0rNS0tKy0rLSsrLSs3LS8tLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYDBQcCAQj/xABGEAACAgEBBAYGBwUFBwUAAAABAgADEQQFEiExBhNBUWFxByIygZGhFCNCUnKCsWKSssHRQ2OiwvAVJFODk+HxM3Ojs8P/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/8QAJREBAAICAgICAgIDAAAAAAAAAAECAxEEMRIhQXETYTJRIiOB/9oADAMBAAIRAxEAPwDuMREBERAREQEREBERARMA1lW+ausr60AMU3h1gU8mK8wPGZwYCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiYNZq66kNlrrWg5ljgeXifCCI2zzxbaqgsxCqOJJICgd5J5Sgbc9IvNNJXn+8sBx5qnP3kjylG2ntW+8719r2nmMn1R+FR6q+4Ss3h7cXCvb3b06ntPp5oqshWa9h/wx6n75wCPLM0W2umN92ha2gfR2Nr1kht5woRWyrYGCd7njh2ceM5vY5nvQakg2Vnk1NzDzV6P5NIi0zLXPxaY8UzHaF0R24dFtOm9idyxjXaScllsPFmJ5nODnwndNsG6k9bp28Sp41uPEdh8R8+U/M20zvWYGc8+Hh257B4/rOnaL0k6iumoajT1X1BVXeqtbr8AYzuuoVj4ZEu5rf7H6e6tl3bRWL6zu2qU4Bh9pcEeqeYP9JuqOnDfbpU/hcj5EH9ZSukdCFa9pabipRXbAObdOw3jkc95Qd4dvAjtninUA8Rgg/A+MzmZh0cNMeWvuPbpen6YadvaWxPMAj5HPym00219PZ7NqZPYTut8GwZyuu4SUlojylNuHT4dYiczq2pqK1PUWbjgeqGG9VnsDL3HkcYOOREtvQ3pMmvpLheqvrY13VE5aqwcxn7Snjhu3j2ggXidvHlwzjb+IiSxIiICIiAiIgIiICIiAiIgIiIGDX6yumqy61gldSs7MexVBJPwE47tvbFusfrbMqDxSvPCpT9nuLd57T4YAufpetP+zzQud7UPuDHM9XXZqMe/qMe/EoAOQCORAMpd7+DEbmUVxMDiSnEwuszdSEN1ka4lSrD9tD5WLgAebioSeyyNqaiysoIDEHdJ5Buan3MAfdJifamannjmqvbCK2ag1t/aLagPjul1/gI/NPWlsc0tgZNR4+GDNb1vU6lbACAjpYAOeAQ4Xz4bvxlq2QtZ1OoVW9Sz11YDKFXGRkd02fPrZ0c1gOlNY9lDleOc12jrB7gzWJ+SaLZj7gar/guyD8HBqx7lZR+WRuht7DUW6fdJVKiGYeyN20moZ5crLPH4T3d6upcfeRTj8DHJ/8AlX4Stunr4dtZdf23lV0l12zT1WSZVZMnVmG1rskLQ7R+ga8asZ6q1PrwPtVoR1jY7WVSLBwzimwD256rskfbVu4i38P93dLTwz6g4Wj31mwe+WrPt5s9PKkw7irAgEEEHiCORHfPsq/o/wBV9Q2kJy2lKqhzktp2G9p255ICg15PM0sZaJq5BPD2KOZA/We5zo326bbd1VhdqNfVU9bMcotiAqKx3cFYY/aB7YF5t14HIE/ISHdrbD27vl/WRNTrqUO61iK2UG7n1sud1MgcRk8ATI22tY1NRtVDaVKZUZLbpYAkAAkkZziRtKw7Nu3lwTkrw8fA/wCu6S5XdgamzP1oCksy8AQCucoQCc8iAfEGWKSgiIgIiICIiAiIgVLp+gLbO3vZOuRW8n02pT/NOX7LUrUtbe3VvVN+OpjW3zQzqXpNUjQ9cOemv0d/kqXp1h9yFzKDt7T9Tr9TWOCXFNUndu3j1wP+Ylh/MJW3T18K2smv7QHEwsJJcTCwmTrwjMJhcSSwmFxCym9JtJutvDkcsPJm9ce52B/537MjbEtuVusR1rReDMzoi8ckgb3FjzOFBPhxlq2rpesQrjJHEDtPAgqPNSw8CQeyUtFyr18CQd5T97s+YxgftTWs7hxeXi8MnrqXUNk7Rq6g2oyNWN4sURwSR7R3SoJPuzNdtcfXo45Gu4fE1MP4DKt0V1+6LaCfVcZHmRut8t34SwafUb50jHt4N+bT2cD7wJM9MsE6y1+0umyTanmrI3WKnsP/AIMlU2TF9BMNrW8yXAMjKeIKkHy7flIVdkko2eHfw+PCGUwsno31p3dJYTksr6S08MFkyUdvJ63Uf+8Z0+cT6DXnqdWqjeemzr0He67mpUe9iJ2mi1XVXU5VgGB7CCMgzdwb18bTD3KN6XNFb9DGsoyLtE6XcMZaoMpsGTyA3VfP93jtl5mO+lXVkcBkcFWB5FWGCD7jCqn6PSabWCvXjePXUouA2KyM73EDjvK2RnPZNwwnPOi21v8AZaajQ6jftWi+1aCrKzPXn7Rz6v2eHieE1dPSO6uzUPpgUXUOHKses3CM8ULcs57scABym1OLkv7iGdsta/LpGl2hXYbQhP1LbrlgVwcsPtYOMq3HkccCZttn7f01rilLUe7dLELxHq4B9Yer7s5nENRdbY5stbfZjxPDj3foPhJ2xNedNqar/aFZJ3eWQQVYeeCflPVHB1Wdz7ZTyPfTu0TxTarqrqcqwDA9hBGQZ7nPekiIgIiICIiBXun94XZ+pDVm1LEapgG3SFt+r384PIsDOdbfc3bP2ftIYL0Aae89yOQjE+C2oh8i067tPRrfTZS3s2I6Hw3hjPu5zmHQjSZr1uyNSMbys4XuWzKWAfhdc++Fq2msxMNFvZGZiaQtmWOhfT2/+rS71tntZO38y4bz3pLczGXepaLVi0MbTC8yOZgcyGjE5lT6QaTq7g49mwb49/Bx7jveQKy0WNI22NJ1ulLj2qGZvEpzcfA581EtWdS83LxeeP8Ace1U02lIbfFlaEEkDFhYjw3V3fcWHjib3Zeo9akHhh0GM5xvHdxn82MyDTpZJpoKvW3YLKj8HUzSXHpOrRP7WLa6YKv38D5jiP5/CR6bJudp6XerYDmBkeY4yt02TF9HX3Dc1WSXU81dDTYUwrMJ3o7s3dXqE790/wAVY+Vcv/o023XZS+g9m/Z7Npyh5tVWxWm1e9SqgeYPeM806J2bm0H4+0CP3bHY/wD2j4yJ0o112z9r/TKDhsg4OQlgZRv1vjmpGPI4PMCbV6cLkxrLb7foifCJr+j+2atZRXqas7rjip9pGHBkbxB/qOBmxksHAtr6EabVajTszWlXJVm9tgQGBbvJVuJ7SJGyx7lH+v8AXKdW6YdE21Wp091YVdwOLWzhiAVNY8ftjyMlbN6HUVYJAz4Dj+82T+k6leXWKRvt5JwTNvTluj2VfZwCNj7zeqvxPP3Sx7N6C3WYLkjlyGB57zc/cJ03T6KpPZQA9/NvieMkTC/NtP8AH00rx6x2i7L0S0VJSpJVBgEnJkqInjmdzuW5ERICIiAiIgJzfpvjRa/T64YCklbB2mpyqWnHaFY1OfMzpEq/pH6PprNE6sgsenNtY45yqkMAO0lGcAd5B7BA5v6UdnfR9UmtXhTqQqWMB7FqDNdvw+SsObTV03b655Hkw+6w5jy7R5y19H2Xaey7NHcd66gCpm+1w9ai8eOAD5gzm2z7n09jUWjD1eo4A4FRgBh5ZBHerAfZMpePl0ODm1P45+evtvHMj2GSyueI4g8QewjsImF65m6iFZNh0fOWsQ8cgHHgMg/xCQ7K5I2CcXqPvBl+WR8wILdI2l2SUZqcHKE7ve1X2GHfgEKfEHwkjU7JYgIAd+wgLw44yN5/JRxJ8hzIBuR0qOAGVWAORkA4PeM8jNT0eQrqtbQccHqsU9pR1wAfLdHxmnl6cm3GiLx79J1lEom0NP1dzp2A5HkeI/X5TprUyn9NNFhq7R25Q+Y4r/m+EpLp4b+9NXpZuNKk1GiE3+iSQveWkp1Bq1hsAJ6tySAMsUIG+ABxJ4BsDmUA7ZtPSNpVuAvQhhitgwOQylFwQe0Ymj1b7uqs/GZaK6AyMmSVYBgDyXOcqvhkE+bHswJrjn4c3n4vcXj/AKxeiPpGdPetDnFOpKocngt3Kt/zewe8lO6dzn5ks0ZRmXiO4jgR3EHsM/QXQ/bP0zSU6g43yu7YByFqHds4d2QSPAiXlzW5iIkBERAREQEREBERAREQEREDjeroOytq2WD1dI4UsPs/R7Wb1h2DqbA3fhM9rCR/Sf0fAsr1acG+sRsfaBqsx+p+Jlu9MulQaIaw+3pXTkMlqrnWuyvy4o3nWJUqNUdRTpNK28wp621XwStlK0mqoFjzI6/HPJCA9siV8f8AOPtVtg63j1L8j7J7j933/r5zd2aeVna2lNVhHZmWTYWuFybrH6xR+8PveffMX0Fp3HlCNdRI9B3LEb7rKfdkZm61FM1GsSFYna+1LJC1jn2yFs67eRG+8qn4gGbBTJeaXwpNP0l0XWUOBzA3h5rx/TI983ZMwXGCs6nbnGiWWHQia+3R9XYy9mcr+E8v6e6Ta7gilzyUZ8/CQ9Np2qG1H/3iw/3j/wARlm2XqeC+WPgf+8qOrJySeZJJ8zNnoNVgL4Ej44/oZfH2y5sf6m82vpM+uJYfRFtPq779Gx9W0den40wlg8yvVn8hmq01gdcGahNWdHq6NVyWmxWY/wB2fVt/wM83lw36CiAYlAiIgIiICIiAiIgIiICIiBTvSpcBoghx9bbWvHl6ubP8k4p0buGm1Y3c7jDcXeJOADjdBOcKTwx5HsnT/SnqBZfTp8krUhdhngXdlK58QK/hZOX7eUb4ZeJQnOOzgpwe44YH3ySJ0sXS3SB1Fq8j8R3g+IlU2fqmrcMDgqeEtug1Qtpw3ENgHwbGA3vGB8O4yobRpNbkeMzvXTtcTN510vVGpW5N9eB+0O1T/TuM1utrmi2drGU7ykg/qO4jtm3XaG9zUZ+XwlG3jqVl2RZitAexV/Sbeq6VfSaqbOnUwytDc9bI91si/SJguvhWIR9e48DiV7aN5PDs7uybTWXTR6pobUavVCYkuwvkyn3YI/mJn1E19p9VvLPwIP6Ay1OzkR5YrR+lr2PruXGTekGmFlZPPhKjsvVcpc9Fbvpunum8Pn3VfR/tH6Rs7S2k7zdWK3PaXqJqc/vIZYJz/wBDl5+j6nTn+x1DFR3JaisP8XWToEokiIgIiICIiAiIgIiICIiBwXpJq7NRqtWcmsO7Kjg+tugbisO71VT35mu2pQoVjgDeIz+0xCoufgonq24C3c47wVWPA4APLj3+E+rSzqj246wKwKj2BllYcOPEbq8fOSIewrdz1G9k5Bz48j7s/AmeNuV72SfaXge89x/13TyoPWED2Rz8cjOPmvxM9a6zgGPZ6rd5Hf8AofMSJjcNsGX8d9tPp7MGbKqyaq0YMlUWTF3d7jbeaXUTaUamVqqyT6b4ZzCwDUTFbfNcl8+PdCunrUWzW3tM9ryJaYXhGtmvsXOR35HxGP5ybaZCsPGIW7jSJs+/iJdNh6iUInddh4n4HiJZth6niJvD56Y1OnT/AEX2BNfqk/41FT/9F2X/APadRnIOgD42pW33tPqE/wAVb/5J1+J7QRESAiIgIiICIiAiIgIiIHCulmjFOquXgMWEflJzWM/hZfjNaLmfeRMqUNR3iBukFsso8d0EfmEvHpb2Qpso1BHquQh7hagLVnxJXf8A+mJSuvVBljgEqvaeLEADh4mSIVqhMAcMnA8+Jx8pEfe3RvgBmUBgOW9j+vD3yc9bElmGDlgBnIwHO4/gcY+Mh6pwcgEby4JHaO0fpA0rnhjtU4932f5j3CeqHnnVcLPBuHx4r88TGpmV49uxw8nlj1Pw2SNJVVk1yPJeGU4YMpwpwQQcMAynj2EEEHtBEq9Ep6WT0bJDV5734VZHaYLGn1mmF2hLDaZDczPa0iuYXiUHXDDg94HxHD9AJsdj2cRIWuXKg9x+R/8AA+MkbI9oTaHE5NfHLLqno947Q057q9R/Bj+YnZZyP0WUFtaX+zVp7M/isesL8ledckywIiJAREQEREBERAREQEREDUdK9j/TNLbp8hXYZrY5wlqENWxxxxvAZ7xkds4Ro2GStp+sax/q3xvVvWQGrA/ZI90/R05B6TdgDT6tNaoAp1R3WOOFWoxjJ7hYo9zKTx3oFQtLWjkURhcrA8LAc7qsCDw5MfeJH1FYHHtwAT2nHf8AEzdWaG3GcIR4P/UCQdTs+zHEoo8CS3wxj5ydCp7WBwDyOFPvxMbNk5HI4I8iMj9ZK24Jr6TlF8iPgxx8sSt3t4NtXmP033Rnea9EWqjUMwcBLjingpYsxyOQUnnNv00rdbqt9Kq2NFQIqINIatnrKpgnAG4BjsxiaHoxeV1enIwCba04glQLD1ZJAIzwc9s3vTDULYlNqFyqWaqht9VVxYhrY+yTwO8T7j3zP4ey8z+WPppkee9+Q1snrrJDVIZ5hseY2smF7IH2x5gYz4zzGWhO3t13lYd4PxHEfMCZdjDiJjpbiD5Te9C9g2avVLpa8gZJscf2VSnDP58gPFh2Zm1enN5sf5RLsnol2ZuaezUsMNqGAXv6urKr/iNh8iJepi0mmSpEqrULXWqoqjkqqMAD3CZYeIiIgIiICIiAiIgIiICIiAkHbeyqtXRZprhvV2run7wPNXU9jAgEHsIEnRA/Prvfor30Oq42V43Wxhbqz7Fq+fyII7Jk1V4K8DOo+kXoau0aBuFa9ZTlqbDyz21Pj7DY9xweOMHg51ttbPTcrVXVkq6N7SsOz/v2y0SIW2W4ma3Sn1fJm+YX+hkjaV2ZE0Z4P5p+jytuno4s6ywl1XFGDjmpDDzU5H6S39LdTU9W5W+kFldgsvrrFm/1tgOWV2Yi0DIVuGQV7uApeZ0TWLdbskYtNgNSWPvqcgVcerrACqANw+t6xODM4e/LOrVn9qIHn3rJG3o3pVszNZMbPPGZ5zJNvRM+ZnnMz7P0V2osWiitrrrDhUUese89wA7SeA7Y0pa8RG5e9naW261KaUNltjBUUcyf5AcSSeAAJPKfpPoF0Rr2dRucH1Fu611gHtMBwRe3cXJAHiTzJkL0cdAq9m19Y+7brbBh7B7KDn1VWeO7yyebEZ4DAF0mkRpzM+b8k+uiIiSwIiICIiAiIgIiICIiAiIgIiICUb0k+j6vaKddSVq1yDCueCWqOVVuOzubmPEcJeYgfjvauluosejUVvTchwyMMEeI7CD2EZB7Jh0Z9r8v8/6z9V9Leh+j2jXuamv1lzuWr6t9efut3fsnIPdOI9I/RNtDRlnoH06jsNY/3gAfeq5k/hz5CRPTXDMReJlScy1dGNeGWuiy/T11kvVuFbDe4sFoGWAKAZ1NnE45nzlTsBVijAq68CrAh1PcVPET5KOlbV409cRwPMc/OMzzmeHtUcyB740tN4jtlzPmZuNgdE9o63H0bS2shx9a46vT4PaHbG9+XJnVuinoXorK27Qs+lWDB6pMrpVP7R4NZ78DvBk6ee/JrHXty/oh0P1m0nxp03aQcPe4IoTvCn+0b9keGSOc/QfQvoZpdm17tIL2sB1lz462w937K9yjh5nJNg09CVqtdarWigBVVQqKByAA4ATJLRGniyZbX7IiJLMiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgQNqbF0upAGp09GoA5dZUr48RvDh7pWdV6Kdiuc/RNwn7l1yD91Xx8pdYg2otfoi2IOJ0zt+LUX4+Tze7L6G7M0xDUaLTIw5N1StYPJ2y3zm9iAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf/9k="
//   },
//   {
//     id: 8,
//     name: "Noise-Canceling Headphones",
//     fullName: "Noise-Canceling Headphones - Over-Ear, Hi-Fi Audio, 40h Battery",
//     category: "Accessories",
//     price: 249,
//     stock: 20,
//     rating: 4.8,
//     description: "High-fidelity headphones with active noise cancellation and a long battery life for uninterrupted listening.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVKEqvgqQMxX9rIJ7Ki9lB6ImUeyTcaVpaXXNHd2_Dw1HFFtDvvSEhLGXo_vSuOOiN6u_u9h3Lsu8RnrozYFYNfIHMsagxQq7kOl4tVvGJJctghvOpmIO_lA"
//   },
//   {
//     id: 9,
//     name: "boat Stone",
//     fullName: "boAt Stone 350 Pro/358 Pro With Dynamic Rgb Leds,12 Hrs Playback",
//     category: "Accessories",
//     price: 129,
//     stock: 35,
//     rating: 4.5,
//     description: "A compact Bluetooth speaker with deep bass, 360-degree sound, and waterproof design.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVE04d3iGej53E6JC-xFnI4OOWaaINEXjxhglw9JmFYZWvCxlocBadvEsUX3106xV0Ai_mwVhItKM3rKEItNs8ydCKrHLh2Bo-0RVAE6ZLByQFBLJv505F"
//   },
//   {
//     id: 10,
//     name: "Fast Charging Power Bank",
//     fullName: "Fast Charging Power Bank - 20000mAh, USB-C, Quick Charge",
//     category: "Accessories",
//     price: 59,
//     stock: 70,
//     rating: 4.3,
//     description: "A high-capacity power bank with fast charging and multiple USB ports for on-the-go power.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTYiQp4zwRDAQC6wYUWX6L9AVnuidArBkvARdwiAYCCCNUAY5oNraScssuInoPG4Xga79QLPcgAzIPAYu6IuDrFMggIB8kd3GL2-5ymzz4"
//   },
//   {
//     id: 11,
//     name: "Robot Vacuum Cleaner",
//     fullName: "Robot Vacuum Cleaner - Smart Mapping, Auto-Charging",
//     category: "Home Appliances",
//     price: 399,
//     stock: 10,
//     rating: 4.7,
//     description: "An advanced robotic vacuum cleaner with smart mapping and automatic charging.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR-IdECNAAmRcBx2KNFjlGMsXajSO6imPa0kFkglfsRpAD_3WCao2H9lEuxM4i-v3P4LvpLufh9ja6xxzhWLRKDt1IX7aFd9Mrp71jiDu0KAZaIVxG8mOho"
//   },
//   {
//     id: 12,
//     name: "Air Purifier Advanced",
//     fullName: "Air Purifier Advanced - HEPA Filter, Smart Sensor",
//     category: "Home Appliances",
//     price: 299,
//     stock: 20,
//     rating: 4.6,
//     description: "A powerful air purifier with HEPA filtration and a real-time air quality sensor.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQ6prMm6A2dL23BZRYjaOn0eFvJZmvMGjxZ_3ljfdR6LPsZBfQinPIGFnN-uNkw9mSoDj6CtJF5EQerRoPxGYILbR3j0-FUemY1YTT90xuWNXwzFZHXE96"
//   },
//   {
//     id: 13,
//     name: "Smart LED Light Strip",
//     fullName: "Smart LED Light Strip - App Control, Voice Assistant Compatible",
//     category: "Home Appliances",
//     price: 49,
//     stock: 100,
//     rating: 4.5,
//     description: "Customizable LED light strip with app and voice control for personalized lighting.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk-BCGoP2C3bJIbqIZjBJ65eRo0-m-j4PNN5X8s-LSmWm7um53FM3uKqM3v-v46gcaB3a2NkzpLopKr6wwmE8jd5XFmNgflP2imnb2aPafYSJNn1EnRLvnIQ"
//   },
//   {
//     id: 14,
//     name: "Coffee Maker Deluxe",
//     fullName: "Coffee Maker Deluxe - Espresso & Drip, Auto Timer",
//     category: "Home Appliances",
//     price: 199,
//     stock: 25,
//     rating: 4.8,
//     description: "A versatile coffee maker with both espresso and drip brewing options and an auto-start timer.",
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCWhvBTpMjRu_kV5bJper9VGaTT-Vbs2QJwQprkjC9gcK1MiYJ6Wex87RPw_DwafCCXNm8qf2W-iNtkpQbN_BNpBtOkEXHSlo-kCG1hAgrDFfw5ddCei-hHg"
//   },
//   {
//     id: 15,
//     name: "Electric Kettle Pro",
//     fullName: "Electric Kettle Pro - Stainless Steel, Rapid Boil",
//     category: "Home Appliances",
//     price: 79,
//     stock: 40,
//     rating: 4.5,
//     description: "A high-speed electric kettle with stainless steel build and temperature control.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_lla06gvy5dh3SwzJ0xV5uzFG0tYY5OsZJKDbJ2xKMLGC2EzCAskVBba0phBxIpoZ2AK6OIWW5jTI9GbAVr3vSy1BJfQbIXopT21RYD2wL0W7rz0hOgUr0g"
//   },
//   {
//     id: 16,
//     name: "Fitness Tracker Band",
//     fullName: "Fitness Tracker Band - Heart Rate, Sleep Monitoring, Waterproof",
//     category: "Wearables",
//     price: 129,
//     stock: 30,
//     rating: 4.6,
//     description: "A sleek fitness tracker with real-time heart rate monitoring and waterproof design.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6k6ZKuOjoSHzDZ4u6Ceo3ZZ6zw-hEyKcAfluAnXHSsBkXjCx_0FroEWIC0T9FMEz-I5uVEPx8xOH9APDZoW6IE0b6mJ5Ut5aCj1KWcFuEQR2YP00gcJSR"
//   },
//   {
//     id: 17,
//     name: "Adjustable Dumbbells Set",
//     fullName: "Adjustable Dumbbells Set - 5-50lbs, Quick Lock System",
//     category: "Fitness",
//     price: 299,
//     stock: 15,
//     rating: 4.7,
//     description: "A set of adjustable dumbbells with quick lock system for easy weight changes.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRdB_x4QFN9OTGak-ZQORstOeh5WMN9HFkmpV-xX9q2TpOtvY-esL19seWoqhNDF6iYspd2KXNDrVwKRkw7KRi_ZEn9DQXY9dvAPm3SToo"
//   },
//   {
//     id: 18,
//     name: "Resistance Bands Pack",
//     fullName: "Resistance Bands Pack - 5 Levels, Non-Slip Grip",
//     category: "Fitness",
//     price: 49,
//     stock: 80,
//     rating: 4.4,
//     description: "A set of resistance bands with different levels for versatile workouts.",
//     image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYOQozTLaThSHyAZASUsDQy6h97YLRv_sTCZSdmMhulVZBcBvPr_AHl1X6gZn0Ri_YwbSnu4_nfLFmx82aRII47gHIhsKKvaxyx5kn3q6OhR864jId6hPn"
//   },
//   {
//     id: 19,
//     name: "Mirrorless Camera Z7",
//     fullName: "Mirrorless Camera Z7 - 45MP, 4K Video, Wi-Fi",
//     category: "Cameras",
//     price: 1799,
//     stock: 5,
//     rating: 4.9,
//     description: "A professional mirrorless camera with high-resolution sensor and 4K recording capabilities.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQYbCWo27wex-v7ZgzcvCahqj4NRYFf4rgsaOASxZNbwmR5vGPUmSvngrzaNq_hxwF9LEdL5fXw8PHKHqy_S9o6gYLmttKZ5lzq2hTi2w6ilzwJrYKDjGV"
//   },
//   {
//     id: 20,
//     name: "Drone Explorer 4K",
//     fullName: "Drone Explorer 4K - GPS, 60-Min Flight Time, Obstacle Avoidance",
//     category: "Cameras",
//     price: 1299,
//     stock: 8,
//     rating: 4.8,
//     description: "A high-performance drone with advanced GPS tracking and 4K video recording.",
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQtF_8Ccw1Kh_6voFtXE8JmmUvXtB1FsR9W5ChlSYr6ob05WdcXVtZ78Qq22NOxRSjjuL-d0ijbnC_4iBB-dM33H82gJ-XISViweQvaDDY"
//   },
//   {
//     id: 21,
//     name: "Men's Leather Jacket",
//     fullName: "Men's Premium Leather Jacket - Stylish & Warm",
//     category: "Clothing",
//     price: 129,
//     stock: 40,
//     rating: 4.7,
//     description: "A premium leather jacket with a stylish look and comfortable fit for all seasons.",
//     image: "data:image/jpeg;base64,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"
//   },
//   {
//     id: 22,
//     name: "Women's Winter Coat",
//     fullName: "Women's Long Winter Coat - Windproof & Warm",
//     category: "Clothing",
//     price: 149,
//     stock: 30,
//     rating: 4.8,
//     description: "Elegant long winter coat with thick insulation for warmth and comfort.",
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpc8FdfH3JiIdrfblK58RaiGG2hT_c5w1ogMp5ioGrccuNgP4ytvU40AsQVWhh38BFGmpdo5UiWORXtwMLpVKwbSstm8qHl65cUf9JJdT9FDtVGsKEdlaloA"
//   },
//   {
//     id: 23,
//     name: "Running Shoes",
//     fullName: "Men's Running Shoes - Lightweight & Durable",
//     category: "Shoes",
//     price: 89,
//     stock: 60,
//     rating: 4.6,
//     description: "Breathable and lightweight running shoes designed for maximum comfort and performance.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4zdRa9IcZfM_Jg_u-dzGz8Gj6Z5XDoFQU4UznKVD_sSD65cw3ugOFyCkgShQJCVdzQddAF9W0JGU0x04FefSo6_JfD4Q22l0ebQI91ZY"
//   },
//   {
//     id: 24,
//     name: "Women's Sneakers",
//     fullName: "Women's Casual Sneakers - Stylish & Comfortable",
//     category: "Shoes",
//     price: 79,
//     stock: 55,
//     rating: 4.7,
//     description: "Trendy and comfortable sneakers for everyday wear with a stylish design.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQoXGjMmf3c1Jxgm7sBHEzw6PY2DmuEcOSytCXN6pkx30knDrkSw6nIHHdkxj8y4s5qnBgoBH3DGnmgQhD5uOdch2ai5BPclHnaaJij9ntt1fCwCnUKCnT"
//   },
//   {
//     id: 25,
//     name: "Casual Hoodie",
//     fullName: "Unisex Casual Hoodie - Soft & Warm",
//     category: "Clothing",
//     price: 49,
//     stock: 70,
//     rating: 4.5,
//     description: "A cozy hoodie perfect for casual wear, made with high-quality cotton blend.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAVlDwTHcoEQ59RSekhms4ONKciL2ilpNEeIsrfFoIxwl345HDM2EToMOTnCPZ_Z2PeSz8marBNDaP9Qb8TWoXcRra0KRpvb6PHpcQAiBxKw_GM0w0leujOw"
//   },
//   {
//     id: 26,
//     name: "Formal Dress Shoes",
//     fullName: "Men's Formal Dress Shoes - Classic Leather",
//     category: "Shoes",
//     price: 120,
//     stock: 35,
//     rating: 4.8,
//     description: "Elegant leather dress shoes, ideal for office wear and special occasions.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSl_SgsvKFFss02ibEeZHTemXE5Me8PbQh3GHx2HExnSAUDb3486TllyGNXuaE9KhWXKODDH_NYuWxS3UCFKj0ps8u8e-54hmAopQQR-1DpHpf1vASEL43zSQ"
//   },
//   {
//     id: 27,
//     name: "Women's High Heels",
//     fullName: "Women's Stylish High Heels - Comfortable Fit",
//     category: "Shoes",
//     price: 99,
//     stock: 45,
//     rating: 4.6,
//     description: "Chic and stylish high heels with a comfortable sole for long wear.",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRmNgWKj6Z97tEr446vnK7MkKjeEIDAmvdIYF9c9hnISoqCfSXn1bQBUzj8nxjXl3iQSEsz7uEbZEJXZ_Z9IEzgAS91gPZW48YMEeHSFMLw7x-xeEXtDiOn"
//   },
//   {
//     id: 28,
//     name: "Slim Fit Jeans",
//     fullName: "Men's Slim Fit Jeans - Comfortable & Stretchable",
//     category: "Clothing",
//     price: 59,
//     stock: 65,
//     rating: 4.4,
//     description: "Modern slim-fit jeans with a stretchable fabric for a perfect fit.",
//     image: "data:image/jpeg;base64,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"
//   },
//   {
//     id: 29,
//     name: "Women's Yoga Pants",
//     fullName: "Women's Yoga & Workout Pants - Stretchable & Breathable",
//     category: "Clothing",
//     price: 45,
//     stock: 80,
//     rating: 4.7,
//     description: "High-quality yoga pants designed for flexibility and comfort during workouts.",
//     image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb97676c-c739-4ad8-b4f2-120672e7aeea.__CR0,0,600,450_PT0_SX600_V1___.png"
//   },
//   {
//     id: 30,
//     name: "Sports Sneakers",
//     fullName: "Men Puma Smashic Unisex Sneakers At Nykaa",
//     category: "Shoes",
//     price: 95,
//     stock: 50,
//     rating: 4.5,
//     description: "Premium quality sports sneakers with shock-absorbing technology for high-impact activities.",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGxrTqHo0pADmCZkm6YJ563Dp94pI_G7LlTKlByvpVM7nOuBDhJAv9X9VECidEUr98Xx32sLBMl7tWlpP8a-by9ZJCyGlQrsZTTDsa-eKM75Xghuc9x-NI"
//   },
//   {
//     id: 31,
//     name: "Radiant Glow Face Serum",
//     description: "Hydrates & brightens skin with Vitamin C.",
//     category: "Beauty",
//     price: 25,
//     stock: 100,
//     rating: 4.7,
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ67USI_QrMY2hYYSzvGu2_lBRG1FglWTBQLpEMUxNwBFUXgnaAa1UB4Nbg53o19E3b_1jxGCk8VeDToYbVBdBjaiyqbV5b6lF7WPUf65VmgP76QMH4txvPcg"
//   },
//   {
//     id: 32,
//     name: "Velvet Matte Lipstick Set",
//     description: "Long-lasting, smudge-proof lipsticks.",
//     category: "Beauty",
//     price: 18,
//     stock: 80,
//     rating: 4.5,
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRjtePqsEhjEfIszhvx10RTljfhq1OsCFUqqtHdR93ww6oqIGqYh7yZn6yAwRKWp7VMXCDEm-frMkDHP1WDh_j3rPElQLisa4Opid7WP3tT"
//   },
//   {
//       id: 33,
//       name: "Organic Green Detox Tea",
//       category: "Health",
//         description: "Boosts metabolism and immunity.",
//         price: 15,
//         stock: 200,
//         rating: 4.6,
//         image: "https://organicindia.com/cdn/shop/files/detox-kahwa-benefits.jpg?v=1734090694"
//       },
//       {
//         id: 34,
//         name: "Omega-3 Fish Oil Capsules",
//         description: "Supports heart and brain health.",
//         category: "Health",
//         price: 22,
//         stock: 150,
//         rating: 4.8,
//         image: "https://m.media-amazon.com/images/I/61Sa75O4MlL.jpg"
//       },
//       {
//         id: 35,
//         name: "Interactive Talking Teddy Bear",
//         description: "Speaks & plays lullabies for kids.",
//         category:"Toys",
//         price: 30,
//         stock: 50,
//         rating: 4.9,
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcROjkeR19VdTOw2dzPEbd5tHEOFSAGe5JZy5VphA-XfQKdduIdmRlHeGWxoIJppTXKkUeUipXM8wEgT7pUXCiD7Zu3z-v0KNTfSbKzzkyJh1be5tYx7-QMl"
//       },
//       {
//         id: 36,
//         name: "Magnetic Building Blocks Set",
//         description: "STEM toy for creativity.",
//         category:"Toys",
//         price: 40,
//         stock: 75,
//         rating: 4.7,
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUwO1W-E3-aN3VFSvv9Jc2CGgabrW4UUa9MMsUss2rdF97xmgsLXdWMjDfBhZXA9wMlbIo8QDGPIFVT4CgQfHaafQOEHr8B1yuCEYXKicq"
//       },
//       {
//         id: 37,
//         name: "Mindset Mastery",
//         description: "Self-improvement book on success & habits.",
//         category:"Books",
//         price: 20,
//         stock: 120,
//         rating: 4.6,
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQRLDxlWIZPmbVesbBpdLBU0-P5OxMFjTqO-utcc8nGhKOsSnvcKBTha21eGEqDq-BPNpA0yI6GbTAtWCf81VJ6E3oUbc8DXFSFgPv7Vi35hJpFMein7ul9"
//       },
//       {
//         id:38,
//         name: "Rich Dad Poor Dad",
//         description: "Financial literacy book.",
//         category:"Books",
//         price: 18,
//         stock: 90,
//         rating: 4.5,
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2O3DsHT_Lr4N-Ha8iU3aaL9KmObVaH5KnX9L-CiVzg_Bwmswv-SbPsD7v49RACCIxWzkLg4SkGN7XFVxEb4WISKaAEuT0_nKdgbPE3a7x_-YrxLCU50k16g"
//       },
//       {
//         id: 39,
//         name: "Atomic Habits",
//         description: "Self-improvement book on habits & motivation.",
//         category:"Books",
//         price: 25,
//         stock: 80,
//         rating: 4.8,
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPmMTPOvgp5wSyQWUWwuV-SlU6W_mOvKXLimDJCo3T7kvt1dB1TiXUv7WFqNDVneHQ1Q6WXguENjbYP07r49exggIDKc5w0zlD0ThRA-rFPaclk_IqMAJ6",
//       },
//       {
//         id: 40,
//         name: "Aromatherapy Essential Oil Diffuser",
//         description: "Creates a relaxing ambiance.",
//         category:"Home & Living",
//         price: 50,
//         stock: 40,
//         rating: 4.7,
//         image: "https://m.media-amazon.com/images/I/81T5T4vSosL.jpg"
//       },
//       {
//         id: 41,
//         name: "Ultra-Plush Memory Foam Pillow",
//         description: "For ultimate sleep comfort.",
//         price: 30,
//         stock: 60,
//         rating: 4.6,
//         image: "https://sleepycat.in/wp-content/uploads/2022/05/SoftTouch-Memory-Foam-Pillow-640-x-480-img-1_Pack-of-1.jpg"
//       }
//   ];

//   const filteredProducts = category === "All" ? products : products.filter((p) => p.category === category);

//   // Handle Wishlist Click
//   const handleWishlistClick = (product) => {
//     setWishlist((prevWishlist) => {
//       if (prevWishlist.some((item) => item.id === product.id)) {
//         toast.info("Already in wishlist!", { position: "top-right", autoClose: 2000 });
//         return prevWishlist;
//       }
//       const updatedWishlist = [...prevWishlist, product];
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       toast.success(`${product.name} added to wishlist!`, { position: "top-right", autoClose: 2000 });
//       return updatedWishlist;
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 font-poppins ">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
//       <h2 className="text-3xl mt-20 text-center font-bold text-teal-900">Shop by Category</h2>

//       {/* Filter & View Toggle */}
//       <div className="flex flex-col md:flex-row justify-between items-center m-10 ">
//         {/* Category Selection */}
//         <div className="flex gap-2 flex-wrap mb-4 md:mb-0">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
//                 category === cat ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* View Toggle Button */}
//         <button
//           onClick={() => setView(view === "grid" ? "list" : "grid")}
//           className="text-2xl text-gray-800 rounded p-2 border transition-colors duration-200 hover:bg-gray-200"
//         >
//           {view === "grid" ? <CiBoxList /> : <CiGrid41 />}
//         </button>
//       </div>

//       {/* Products Grid/List */}
//       <div className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" : "flex flex-col space-y-6"}`}>
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className={`relative bg-white border rounded-lg  shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${
//               view === "list" ? "flex" : ""
//             }`}
//           >
//             {/* Wishlist Button - Positioned on Image */}
//             <button
//               onClick={() => handleWishlistClick(product)}
//               className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 bg-white bg-opacity-75 p-2 rounded-full shadow-md"
//             >
//               {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />}
//             </button>

//             <img
//               src={product.image}
//               alt={product.name}
//               className={`object-cover cursor-pointer ${
//                 view === "grid" ? "w-full h-48 sm:h-64" : "w-32 h-32 sm:w-48 sm:h-48"
//               }`}
//             />

//             <div className={`p-6 flex flex-col justify-between ${view === "list" ? "flex-1" : ""}`}>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
//                 <p className="text-gray-500 text-sm mb-4">{product.description}</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-red-600 font-bold text-lg">${product.price}</p>

//                 {/* Add to Cart Button */}
//                 <button
//                   className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-md shadow transition-colors duration-200 hover:bg-green-600 hover:text-white"
//                   onClick={() => {
//                     addToCart(product);
//                     toast.success(`${product.name} added to cart!`);
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Shop;


