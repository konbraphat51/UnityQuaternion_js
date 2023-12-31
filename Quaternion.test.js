const Quaternion = require("./Quaternion.js")

test("constructor", () => {
	const q = new Quaternion(1, 2, 3, 4)
	expect(q.x).toBeCloseTo(1)
	expect(q.y).toBeCloseTo(2)
	expect(q.z).toBeCloseTo(3)
	expect(q.w).toBeCloseTo(4)
})

test("eulerAngles() zero-test", () => {
	const q = new Quaternion(0, 0, 0, 1)
	const e = q.eulerAngles
	expect(e[0]).toBeCloseTo(0)
	expect(e[1]).toBeCloseTo(0)
	expect(e[2]).toBeCloseTo(0)
})

test("eulerAngles()", () => {
	const q = new Quaternion(1, 2, 3, 4).normalized
	const e = q.eulerAngles
	expect(e[0]).toBeCloseTo(352.34, 2)
	expect(e[1]).toBeCloseTo(47.73, 2)
	expect(e[2]).toBeCloseTo(70.35, 2)
})

test("Normalize()", () => {
	const q = Quaternion.Normalize(new Quaternion(1, 2, 3, 4))
	expect(q.x).toBeCloseTo(0.18257, 3)
	expect(q.y).toBeCloseTo(0.36515, 3)
	expect(q.z).toBeCloseTo(0.54772, 3)
	expect(q.w).toBeCloseTo(0.7303, 3)
})

test(".normalized", () => {
	const q = new Quaternion(1, 2, 3, 4).normalized
	expect(q.x).toBeCloseTo(0.18257, 3)
	expect(q.y).toBeCloseTo(0.36515, 3)
	expect(q.z).toBeCloseTo(0.54772, 3)
	expect(q.w).toBeCloseTo(0.7303, 3)
})

test("AngleAxis", () => {
	const q = Quaternion.AngleAxis(20, [1, 2, 3]).normalized
	expect(q.x).toBeCloseTo(0.04641, 2)
	expect(q.y).toBeCloseTo(0.09282, 2)
	expect(q.z).toBeCloseTo(0.13923, 2)
	expect(q.w).toBeCloseTo(0.98481, 2)
})

test("Set", () => {
	const q = new Quaternion(1, 2, 3, 4)
	q.Set(5, 6, 7, 8)
	expect(q.x).toBeCloseTo(5)
	expect(q.y).toBeCloseTo(6)
	expect(q.z).toBeCloseTo(7)
	expect(q.w).toBeCloseTo(8)
})

test("FromToRotation", () => {
	const q = new Quaternion(1, 2, 3, 4)
	//cover setter too
	q.SetFromToRotation([5, 6, 7], [1, 2, 3])
	expect(q.x).toBeCloseTo(0.05137, 2)
	expect(q.y).toBeCloseTo(-0.10275, 2)
	expect(q.z).toBeCloseTo(0.05137, 2)
	expect(q.w).toBeCloseTo(0.99205, 2)
})

test("LookRotation", () => {
	const q = new Quaternion(1, 2, 3, 4)
	//cover setter too
	q.SetLookRotation([1, 1, 1], [0, 1, 0])
	expect(q.x).toBeCloseTo(-0.27, 1)
	expect(q.y).toBeCloseTo(0.36, 1)
	expect(q.z).toBeCloseTo(0.11, 1)
	expect(q.w).toBeCloseTo(0.88, 1)
})

test("ToAngleAxis", () => {
	const q = new Quaternion(1, 1, 1, 1).normalized
	const [angle, axis] = q.ToAngleAxis()
	expect(angle).toBeCloseTo(120, 2)
	expect(axis[0]).toBeCloseTo(0.58, 1)
	expect(axis[1]).toBeCloseTo(0.58, 1)
	expect(axis[2]).toBeCloseTo(0.58, 1)
})

test("ToString", () => {
	const q = new Quaternion(1, 2, 3, 4)
	expect(q.ToString(1)).toBe("(1.0, 2.0, 3.0, 4.0)")
})

test("Multiply 2", () => {
	const q1 = new Quaternion(1, 2, 3, 4)
	const q2 = new Quaternion(4, 3, 2, 1)
	const q = Quaternion.Multiply(q1.normalized, q2.normalized)
	expect(q.x).toBeCloseTo(0.4, 1)
	expect(q.y).toBeCloseTo(0.8, 1)
	expect(q.z).toBeCloseTo(0.2, 1)
	expect(q.w).toBeCloseTo(-0.4, 1)
})

test("Multiply 3", () => {
	const q1 = new Quaternion(1, 2, 3, 4).normalized
	const q2 = new Quaternion(4, 3, 2, 1).normalized
	const q3 = new Quaternion(3, 3, 4, 0).normalized

	const r0 = Quaternion.Multiply(q1, q2, q3)
	const r1 = Quaternion.Multiply(q1, Quaternion.Multiply(q2, q3))

	expect(r0.x).toBeCloseTo(r1.x, 2)
	expect(r0.y).toBeCloseTo(r1.y, 2)
	expect(r0.z).toBeCloseTo(r1.z, 2)
	expect(r0.w).toBeCloseTo(r1.w, 2)
})

test("Multiply 0", () => {
	const q = Quaternion.Multiply()
	expect(q.x).toBeCloseTo(0)
	expect(q.y).toBeCloseTo(0)
	expect(q.z).toBeCloseTo(0)
	expect(q.w).toBeCloseTo(1)
})

test("Multiply 1", () => {
	const q = Quaternion.Multiply(new Quaternion(1, 2, 3, 4))
	expect(q.x).toBeCloseTo(1)
	expect(q.y).toBeCloseTo(2)
	expect(q.z).toBeCloseTo(3)
	expect(q.w).toBeCloseTo(4)
})

test("RotateVector", () => {
	const q = new Quaternion(1, 2, 3, 4).normalized

	let v = [4, 5, 6]
	let norm = Math.sqrt(4 * 4 + 5 * 5 + 6 * 6)
	v = [v[0] / norm, v[1] / norm, v[2] / norm]

	v = q.RotateVector(v)

	//normalize
	norm = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
	v = [v[0] / norm, v[1] / norm, v[2] / norm]

	expect(v[0]).toBeCloseTo(0.18, 1)
	expect(v[1]).toBeCloseTo(0.71, 1)
	expect(v[2]).toBeCloseTo(0.68, 1)
})

test("Angle", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(4, 2, 1, 3).normalized

	expect(Quaternion.Angle(q0, q1)).toBeCloseTo(79.88902, 2)
})

test("Dot", () => {
	const q0 = new Quaternion(1, 2, 3, 4)
	const q1 = new Quaternion(4, 2, 1, 3)

	const result = Quaternion.Dot(q0, q1)

	expect(result).toBeCloseTo(23)
})

test("Euler", () => {
	const q = Quaternion.Euler(30, 60, 90)

	expect(q.x).toBeCloseTo(0.5, 1)
	expect(q.y).toBeCloseTo(0.18, 1)
	expect(q.z).toBeCloseTo(0.5, 1)
	expect(q.w).toBeCloseTo(0.68, 1)
})

test("Inverse", () => {
	const q = new Quaternion(0.5, 0.5, 0.5, 0.5)
	const inv = Quaternion.Inverse(q)

	expect(inv.x).toBeCloseTo(-0.5, 1)
	expect(inv.y).toBeCloseTo(-0.5, 1)
	expect(inv.z).toBeCloseTo(-0.5, 1)
	expect(inv.w).toBeCloseTo(0.5, 1)
})

test("Identity", () => {
	const q = Quaternion.identity

	expect(q.x).toBeCloseTo(0)
	expect(q.y).toBeCloseTo(0)
	expect(q.z).toBeCloseTo(0)
	expect(q.w).toBeCloseTo(1)
})

test("Lerp", () => {
	const q0 = new Quaternion(1, 2, 3, 4)
	const q1 = new Quaternion(2, 2, 2, 2)

	const q = Quaternion.Lerp(q0, q1, 0.5)

	expect(q.x).toBeCloseTo(0.32, 1)
	expect(q.y).toBeCloseTo(0.43, 1)
	expect(q.z).toBeCloseTo(0.54, 1)
	expect(q.w).toBeCloseTo(0.65, 1)
})

test("Lerp t=0", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(3, 3, 4, 2).normalized

	const q = Quaternion.Lerp(q0, q1, -0.1)

	expect(q.x).toBeCloseTo(q0.x, 2)
	expect(q.y).toBeCloseTo(q0.y, 2)
	expect(q.z).toBeCloseTo(q0.z, 2)
	expect(q.w).toBeCloseTo(q0.w, 2)
})

test("Lerp t=1", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(3, 3, 4, 2).normalized

	const q = Quaternion.Lerp(q0, q1, 1.1)

	expect(q.x).toBeCloseTo(q1.x, 2)
	expect(q.y).toBeCloseTo(q1.y, 2)
	expect(q.z).toBeCloseTo(q1.z, 2)
	expect(q.w).toBeCloseTo(q1.w, 2)
})

test("RotateTowards; limitted", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(4, 2, 1, 3).normalized

	const q = Quaternion.RotateTowards(q0, q1, 30)

	expect(q.x).toBeCloseTo(0.41432, 2)
	expect(q.y).toBeCloseTo(0.38705, 2)
	expect(q.z).toBeCloseTo(0.43338, 2)
	expect(q.w).toBeCloseTo(0.70051, 2)
})

test("RotateTowards; unlimited", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(4, 2, 1, 3).normalized

	const q = Quaternion.RotateTowards(q0, q1)

	expect(q.x).toBeCloseTo(0.7303, 2)
	expect(q.y).toBeCloseTo(0.36515, 2)
	expect(q.z).toBeCloseTo(0.18257, 2)
	expect(q.w).toBeCloseTo(0.54772, 2)
})

test("Slerp", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(4, 2, 1, 3).normalized

	//cover SlerpUnclamped too

	const q = Quaternion.Slerp(q0, q1, 0.5)

	expect(q.x).toBeCloseTo(0.48564, 2)
	expect(q.y).toBeCloseTo(0.38851, 2)
	expect(q.z).toBeCloseTo(0.38851, 2)
	expect(q.w).toBeCloseTo(0.6799, 2)
})

test("Slerp t=0", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(3, 3, 4, 2).normalized

	const q = Quaternion.Slerp(q0, q1, -0.1)

	expect(q.x).toBeCloseTo(q0.x, 2)
	expect(q.y).toBeCloseTo(q0.y, 2)
	expect(q.z).toBeCloseTo(q0.z, 2)
	expect(q.w).toBeCloseTo(q0.w, 2)
})

test("Slerp t=1", () => {
	const q0 = new Quaternion(1, 2, 3, 4).normalized
	const q1 = new Quaternion(3, 3, 4, 2).normalized

	const q = Quaternion.Slerp(q0, q1, 1.1)

	expect(q.x).toBeCloseTo(q1.x, 2)
	expect(q.y).toBeCloseTo(q1.y, 2)
	expect(q.z).toBeCloseTo(q1.z, 2)
	expect(q.w).toBeCloseTo(q1.w, 2)
})
